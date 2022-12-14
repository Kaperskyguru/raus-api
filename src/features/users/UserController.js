const path = require("path");
const { Op } = require("sequelize");
const Controller = require("../Controller");
const User = require(path.join(__dirname, "./../../models")).User;
const Cabin = require(path.join(__dirname, "./../../models")).Cabin;

class Users {
  static async index(req, res) {
    try {
      const page = req.query.page || 0;
      const size = req.query.size || 10;
      const term = req.query.term || undefined;
      const status = req.query.status || undefined;

      let where = {};
      if (status && !status.includes("All")) where.status = status;

      if (term)
        where.name = {
          [Op.iLike]: "%" + term + "%",
        };

      const users = await User.findAll({ where });
      return res.status(200).json({
        success: true,
        message: "Users loaded successfully",
        users,
      });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }

  static async store(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json({
        success: true,
        message: "New User created successfully",
        user: user,
      });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }

  static async assignCabin(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (user) {
        await user.update({
          cabin_id: req.body.cabin,
          status: "ACTIVE",
        });
        return res.status(200).json({
          success: true,
          message: "Cabin assigned successfully",
          user,
        });
      } else
        return res.status(404).json({
          success: false,
          msg: "User not found",
        });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }

  static async show(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      const cabin = await Cabin.findOne({ where: { id: user.cabin_id } });
      if (user) {
        const mappedUser = {
          ...user.dataValues,
          cabin: cabin ?? null,
        };
        return res.status(200).json({
          success: true,
          message: "User loaded successfully",
          user: mappedUser,
        });
      } else
        return res.status(404).json({
          success: false,
          msg: "User not found",
        });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }

  static async update(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      await user.update(req.body);
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }

  static async delete(req, res) {
    try {
      const deletedUser = await User.destroy({
        where: { id: req.params.id },
      });
      if (deletedUser)
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
          deletedUser,
        });
      else
        res.status(404).json({
          success: false,
          message: "No user found",
        });
    } catch (error) {
      return Controller.serverErrorResponse(res, error);
    }
  }
}

module.exports = Users;
