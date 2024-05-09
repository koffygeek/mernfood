import express from "express";
import { Food } from "../models/foodModels.js";

const router = express.Router();

// create a new food
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.priceInCents ||
      !request.body.image
    ) {
      return response.status(400).send({
        message: "Required fields are missing!",
      });
    }

    const newFood = {
      name: request.body.name,
      priceInCents: request.body.priceInCents,
      image: request.body.image,
    };

    const food = await Food.create(newFood);

    return response.status(201).send(food);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// getting all items food
router.get("/", async (request, response) => {
  try {
    const food = await Food.find({});

    return response.status(200).json({
      data: food,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// deleting a specific food
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Food.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({
        message: "Item not found",
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// updating a food item
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.priceInCents ||
      !request.body.image
    ) {
      return response.status(400).send({
        message: "Required fields are missing!",
      });
    }

    const { id } = request.params;
    const result = await Food.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({
        message: "Food not found",
      });
    } else {
      return response.status(200).send({ message: "Food updated" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// getting a specific food;
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const food = await Food.findById(id);

    return response.status(200).json(food);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
