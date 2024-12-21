// controllers/infoController.js

const db = require('../models');

exports.getInfoPage = async (req, res) => {
  try {
    // 디바이스 목록 불러오기 (device_id, device_name, measurement_date)
    const devices = await db.Device.findAll({
      attributes: ['device_id', 'device_name', 'measurement_date', 'location']
    });

    // info.ejs 페이지에 디바이스 목록 등을 넘겨준다
    return res.render('info', { user: req.user, devices });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// 특정 디바이스 ID와 measurement_date에 해당하는 Report들 가져오기
exports.getReportsByDeviceAndDate = async (req, res) => {
  const { device_id, measurement_date } = req.params;
  try {
    const reports = await db.Report.findAll({
      where: { device_id, measurement_date },
      attributes: ['id', 'name', 'person_id', 'alcohol_level'] // 수정된 부분
    });

    return res.json(reports);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Report 상세 조회 (사람 정보, 디바이스 정보, 처벌 기록)
exports.getReportDetail = async (req, res) => {
  const { reportId } = req.params;
  try {
    const report = await db.Report.findByPk(reportId, {
      include: [
        {
          model: db.People,
          as: 'Person',
          attributes: ['person_id', 'name', 'address', 'phone_number', 'etc']
        },
        {
          model: db.Device,
          as: 'Device',
          attributes: ['device_id', 'device_name', 'location', 'measurement_date']
        }
      ]
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // 해당 사람의 패널티 기록 가져오기
    const penalties = await db.Penalty.findAll({
      where: { person_id: report.person_id },
      attributes: ['id', 'penalty_date', 'penalty_info', 'reason', 'device_id']
    });

    return res.json({
      report,
      person: report.Person, // 수정된 부분
      device: report.Device, // 수정된 부분
      penalties
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
