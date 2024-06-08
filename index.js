const express = require("express");
const dbconnect = require("./atlas");
const crud = require("./modals");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// const value = new crud({
//   name: "Ford",
//   budget: { totalBudget: 1525, remainingBudget: 2700 },
//   owner: { firstName: "Brij", lastName: "Bihari" },
//   location: { latitude: 46545.45, longitude: 4655.245 },
//   cars: [
//     {
//       name: "Ford Endeavour",
//       model: 2018,
//       brand: "Ford",
//       color: "Silver",
//       price: 5452,
//     },
//   ],
// });

// value
//   .save()
//   .then(() => console.log("Data saved successfully"))
//   .catch((error) => console.log(error));


app.get("/favicon.ico", (req, res) => {
  res.status(204).end();  
});

app.get("/single-user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await crud.findById(id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.get("/", async (req, res) => {
  try {
    const data = await crud.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.post("/update/:id", async (req, res) => {
  const id = req.params.id; 
  console.log(id,req.body);

  try {
    const createCar = await crud.updateOne({ _id: id },{$push:{cars:req.body}} ); 
    res.json(createCar);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/post", async (req, res) => {
  try {
    const createdData = await crud.create(req.body);
    res.json(createdData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await crud.findById(id);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.put("/updatedata/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedData = await crud.findByIdAndUpdate(id, req.body);
    res.json(updatedData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await crud.findByIdAndDelete(id);
    res.json("Delete successful");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.delete("/delete-car/:userId/:carId", async (req, res) => {
  const { carId ,userId} = req.params;
  const userData = await crud.findById(userId)
  userData.cars= userData.cars.filter(element => element.id != carId);
  console.log(userData,carId);
  await userData.save()
  res.json("Deleted car successful");
});
app.post("/update-car/:userId/:carId", async (req, res) => {
  const { userId, carId } = req.params;
  const { brand, model, color, price } = req.body;

  try {
    const userData = await crud.findById(userId);
    const carIndex = userData.cars.findIndex((car) => car.id === carId);

    if (carIndex === -1) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    const updatedCar = {
      ...userData.cars[carIndex],
      brand: brand || userData.cars[carIndex].brand,
      model: model || userData.cars[carIndex].model,
      color: color || userData.cars[carIndex].color,
      price: price || userData.cars[carIndex].price,
    };

    userData.cars[carIndex] = updatedCar;

    await userData.save();

    res.status(200).json({ success: true, message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(4055, () => console.log("Server is starting on port No 4055"));
