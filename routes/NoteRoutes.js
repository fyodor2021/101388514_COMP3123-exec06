"use strict";
const noteModel = require("../models/NotesModel.js");
const express = require("express");
const noteRoutes = express.Router();
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
noteRoutes.post("/", async (req, res) => {
  // Validate request
  if (req.body) {
    try {
      const note = noteModel({
        ...req.body,
      });
      await note.save();
      return res.status(200).send(note);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  //TODO - Write your code here to save the note
  else {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
noteRoutes.get("/", async (req, res) => {
  // Validate request
  //TODO - Write your code here to returns all note
  try {
    const notes = await noteModel.find({});
    if (!notes) {
      res.status(200).send("No notes to Display");
    } else {
      res.status(200).send(notes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
noteRoutes.get("/:noteId", async (req, res) => {
  // Validate request
  if (req.params.noteId) {
    try {
      const notes = await noteModel.findOne({ _id: req.params.noteId });
      if (!notes) {
        res.status(200).send("No notes to Display");
      } else {
        res.status(200).send(notes);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send({ message: "notesId param Can't be empty" });
  }
});
//TODO - Write your code here to return onlt one note using noteid

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
noteRoutes.put("/:noteId", async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  } else {
    try {
      const note = await noteModel.updateOne(
        { _id: req.params.noteId },
        { ...req.body }
      );
      if (note.nModified > 0) {
        res.status(200).send(note);
      } else {
        res.status(200).send({ message: "your document wansn't modified" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
  //TODO - Write your code here to update the note using noteid
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
noteRoutes.delete("/:noteId", async (req, res) => {
  // Validate request
  //TODO - Write your code here to delete the note using noteid

  if (!req.params.noteId) {
    return res.status(400).send({
      message: "Note param can not be empty",
    });
  } else {
    try {
      const note = await noteModel.deleteOne({ _id: req.params.noteId });
      if (note) {
        res.status(200).send(note);
      } else {
        res.status(200).send({ message: "note is deleted" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

module.exports = noteRoutes;
