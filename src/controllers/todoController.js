const todo = require("../models/todoModel");

const todoAdd = async (req, res) => {
  try {
    const _todo = await todo.findOne({ name: req.body.name });

    if (_todo) {
      return res.status(400).json({
        success: false,
        message: "Bu isimde kayıt mevcut.",
      });
    }
    const todoAdd = new todo(req.body);
    await todoAdd
      .save()
      .then(() => {
        return res.status(201).json(todoAdd);
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "Kayıt oluşturulurken hata oluştu : " + err,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayıt oluşturulamadı!",
    });
  }
};

const todoGetAll = async (req, res) => {
  const { page } = req.query;
  const limit = 2;
  const skip = Number(page - 1) * limit;
  try {
    const todoGetAll = await todo.find({}).limit(limit).skip(skip);
    return res.status(200).json({
      success: true,
      data: todoGetAll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayıtlar getirilemedi.",
    });
  }
};

const todoUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const todoUpdate = await todo.findByIdAndUpdate(id, req.body);
    if (todoUpdate) {
      return res.status(200).json({
        success: true,
        message: "Güncelleme başarılı",
      });
    } else
      return res.status(400).json({
        success: false,
        message: "Kayıt güncellenemedi! (else)",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayıt güncellenemedi!",
    });
  }
};

const todoDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const todoDelete = await todo.findByIdAndDelete(id);
    if (todoDelete) {
      return res.status(200).json({
        success: true,
        message: "Mesaj başarıyla silindi!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Mesaj silinemedi (else)",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayıt silinemedi (server) : " + error,
    });
  }
};

const todoGet = async (req, res) => {
  const { id } = req.params;
  const todoGet = await todo.findById(id);

  if (todoGet) {
    return res.status(200).json(todoGet);
  } else {
    return res.status(404).json({
      success: false,
      message: "Kayıt bulunamadı!",
    });
  }
};

module.exports = {
  todoAdd,
  todoGetAll,
  todoUpdate,
  todoDelete,
  todoGet,
};
