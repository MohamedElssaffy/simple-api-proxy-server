const router = require('express').Router();
const needle = require('needle');
const apicache = require('apicache-plus');

const keys = {
  API_URL: process.env.API_URL,
  API_KEY_NAME: process.env.API_KEY_NAME,
  API_KEY_VALUE: process.env.API_KEY_VALUE,
};

const cache = apicache.middleware;

router.get('/', cache('3 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [keys.API_KEY_NAME]: keys.API_KEY_VALUE,
      ...req.query,
    });

    const apiRes = await needle('get', `${keys.API_URL}?${params}`);

    const data = apiRes.body;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});

module.exports = router;
