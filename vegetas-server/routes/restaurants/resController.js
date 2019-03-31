var restaurants = require("../../models").restaurants;
var db = require("../../models");

exports.createRes = async (req, res) => {
  const {
    name,
    latitude,
    longitude,
    phoneNumber,
    menu,
    imageURL,
    vegLevel,
    address
  } = req.body;
  try {
    await restaurants.create({
      name: name,
      latitude: latitude,
      longitude: longitude,
      phoneNumber: phoneNumber,
      menu: menu,
      imageURL: imageURL,
      vegLevel: vegLevel,
      address: address
    });
    res.status(201).send("ok");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getRes = async (req, res) => {
  const { vegLevel } = req.body;
  try {
    let result = await restaurants.findAll({
      where: {
        vegLevel: vegLevel
      }
    });
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.search = async (req, res) => {
  const { vegLevel, query } = req.body;
  try {
    let rest = await restaurants.findAll({
      where: {
        vegLevel: vegLevel
      }
    });

    if (query.length === 0) {
      throw new Error('단어 입력')
    }

    let queryArr = query.split(" ");
    let filterRest = rest.filter(el => {
      for (let word of queryArr) {
        return el.name.includes(word) || el.menu.includes(word);
      }
    });

    if (filterRest.length === 0) {
      throw new Error('검색 결과 없음');
    }
    res.status(201).send(filterRest);
  } catch (e) {
    if (e.message === '검색 결과 없음') {
      res.status(403).send("검색 결과가 없습니다.");
    } else if (e.message === '단어 입력') {
      res.status(401).send("단어를 입력해주세요.");
    }
  }
};
