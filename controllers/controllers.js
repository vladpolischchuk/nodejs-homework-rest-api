const { Contact } = require("../models/contact");

const {
      HttpError,
      ctrlWrapper,
} = require("../utils/index");

const getAll = async (req, res, next) => {
      const result = await Contact.find();

      res.status(200).json({
            data: result,
      });
};

const getById = async (req, res, next) => {
      const { id } = req.params;
      const result = await Contact.findById(id);
      if (!result) {
            throw HttpError(404, `Contact with ${id} not found`);
      };

      res.status(200).json({
            data: result,
      });
};

const getAdd = async (req, res, next) => {
      const result = await Contact.create(req.body);

      res.status(201).json({ data: result });
};

const getRemove = async (req, res, next) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndRemove(id);

      if (!result) {
            throw HttpError(404, `Contact with ${id} not found`);
      };

      res.status(200).json({ message: "Contact deleted", data: result });
};

const getUpdate = async (req, res, next) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

      if (!result) {
            throw HttpError(404, `Contact with ${id} not found`);
      };

      res.status(200).json({ message: "Contact updated", data: result });
};

const getFavorite = async (req, res, next) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

      if (!result) {
            throw HttpError(404, `Contact with ${id} not found`);
      };

      res.status(200).json({ message: "Contact updated", data: result });
};

module.exports = {
      getAll: ctrlWrapper(getAll),
      getById: ctrlWrapper(getById),
      getAdd: ctrlWrapper(getAdd),
      getRemove: ctrlWrapper(getRemove),
      getUpdate: ctrlWrapper(getUpdate),
      getFavorite: ctrlWrapper(getFavorite),
};