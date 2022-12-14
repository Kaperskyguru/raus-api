const Validator = require("../helpers/validate");

const storeUser = async (req, res, next) => {
  const validationRule = {
    email: "required|string|email|exist:User,email",
    name: "required|string",
    phone_number: "required|string",
    home_address: "required|string",
    job_title: "required|string",
    country: "required|string",
  };

  Validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(422).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const assignCabin = async (req, res, next) => {
  const validationRule = {
    cabin: "required|shouldExist:Cabin,id",
  };

  Validator(req.body, validationRule, {}, (err, status) => {
    if (err && err?.errors?.cabin.includes("id already in use")) {
      next();
      return;
    }

    if (err && !status) {
      res.status(422).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      res.status(422).send({
        success: false,
        message: "Validation failed",
        data: {
          errors: { cabin: ["Enter a valid Cabin ID"] },
        },
      });
    }
  });
};

const updateUser = async (req, res, next) => {
  const validationRule = {
    cabin_id: "shouldExist:Cabin,id",
    name: "string",
    status: "string",
    phone_number: "string",
    home_address: "string",
    job_title: "string",
    country: "string",
  };

  Validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(422).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const storeCabin = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
    location: "required|string",
    temperature: "required|numeric",
    water: "required|numeric",
    state: "required|string",
    country: "required|string",
  };

  Validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(422).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const updateCabin = async (req, res, next) => {
  const validationRule = {
    name: "string",
    temperature: "numeric",
    water: "numeric",
    powerConsumption: "string",
  };

  Validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(422).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  storeUser,
  updateUser,
  assignCabin,
  storeCabin,
  updateCabin,
};
