const path = require("path");
const { Op } = require("sequelize");
const Controller = require("../Controller");
const Cabin = require(path.join(__dirname, "./../../models")).Cabin;

class Cabins {
  static async index(req, res) {
    try {
      const page = req.query.page || 0;
      const size = req.query.size || 10;
      const term = req.query.term || undefined;
      const status = req.query.status || undefined;

      let where = {};
      if (status && !status.includes("All")) where.status = status;

      if (term)
        where = {
          ...where,
          name: {
            [Op.iLike]: "%" + term + "%",
          },
        };

      const cabins = await Cabin.findAll({
        where: {
          ...where,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Cabins loaded successfully",
        cabins,
      });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }

  static async store(req, res) {
    try {
      const cabin = await Cabin.create(req.body);
      return res.status(201).json({
        success: true,
        message: "New Cabin created successfully",
        cabin: cabin,
      });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }

  static async show(req, res) {
    const cabin = await Cabin.findOne({ where: { id: req.params.id } });
    if (cabin) {
      return res.status(200).json({
        success: true,
        message: "Cabin loaded successfully",
        cabin,
      });
    } else
      return res.status(404).json({
        success: false,
        msg: "Cabin not found",
      });
  }

  static async update(req, res) {
    try {
      const cabin = await Cabin.findOne({ where: { id: req.params.id } });
      await cabin.update(req.body);
      res.status(200).json({
        success: true,
        message: "Cabin updated successfully",
        cabin,
      });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }

  static async delete(req, res) {
    try {
      const deletedCabin = await Cabin.destroy({
        where: { id: req.params.id },
      });
      if (deletedCabin)
        res.status(200).json({
          success: true,
          message: "Cabin deleted successfully",
          deletedCabin,
        });
      else
        res.status(404).json({
          success: false,
          message: "No cabin found",
        });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }
}

module.exports = Cabins;
