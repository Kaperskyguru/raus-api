class Controller {
  static serverErrorResponse(res, error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error Occured, Please try again",
      error,
    });
  }

  static successResponse(res, message, data) {
    return res.status(500).json({
      success: true,
      message,
      payload: data,
    });
  }
}

module.exports = Controller;
