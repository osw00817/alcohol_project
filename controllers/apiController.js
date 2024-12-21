// controllers/apiController.js

const db = require('../models');
const { Op } = require('sequelize');

exports.createReport = async (req, res) => {
  const { device_id, device_name, location, person_id, alcohol_level } = req.body;

  // 필수 필드 확인
  if (!device_id || !device_name || !location || !person_id || alcohol_level === undefined) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // 트랜잭션 시작
  const t = await db.sequelize.transaction();

  try {
    // 1. Device 테이블 확인 및 추가
    let device = await db.Device.findOne({
      where: {
        device_id,
        device_name
      },
      transaction: t
    });

    const currentDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    if (!device) {
      // Device가 없으면 추가
      device = await db.Device.create({
        device_id,
        device_name,
        location,
        measurement_date: currentDate
      }, { transaction: t });
    } else {
      // Device가 있으면 measurement_date 업데이트
      await db.Device.update(
        { measurement_date: currentDate },
        { where: { id: device.id }, transaction: t }
      );
    }

    // 2. People 테이블 확인
    const person = await db.People.findOne({
      where: { person_id },
      transaction: t
    });

    if (!person) {
      throw new Error('Person not found.');
    }

    // 3. Report 테이블에 추가
    const report = await db.Report.create({
      alcohol_level,
      measurement_date: currentDate,
      device_id,
      location,
      name: person.name,
      person_id
    }, { transaction: t });

    // 4. alcohol_level이 0.7 이상이면 Penalty 테이블에 추가
    if (alcohol_level >= 0.7) {
      await db.Penalty.create({
        person_id,
        name: person.name,
        penalty_date: currentDate,
        penalty_info: 'High Alcohol Level',
        reason: 'Alcohol level exceeds the limit',
        device_id
      }, { transaction: t });
      // 문자 메세지 전송 기능 추가.
    }

    // 트랜잭션 커밋
    await t.commit();

    return res.status(201).json({ message: 'Report created successfully.', report });
  } catch (error) {
    // 트랜잭션 롤백
    await t.rollback();
    console.error('Error creating report:', error);
    return res.status(500).json({ error: 'Server error.' });
  }
};
