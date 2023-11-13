const Role = require("./model.user.role");
const User = require("./model.user");
const CatagoryCourse = require("./model.category.course");
const ToolsCourse = require("./model.course.tools");
const MateriCourse = require("./model.course.materi");
const VariationOptionCourse = require("./model.course.variation.option");
const Course = require("./model.course");
const OrderCourse = require("./model.orders.course");
const OrderItemsCourse = require("./model.orders.items.course");
const sequelize = require("../../config/config.db");

async function createRoles(roleDataArray) {
  try {
    const createdRoles = await Role.bulkCreate(roleDataArray);
    console.log(`Roles created: ${createdRoles.length} roles`);
    return createdRoles;
  } catch (error) {
    console.error("Error creating roles:", error.message);
    throw error; // You might want to handle the error differently in your application
  }
}

// Example usage:
const newRoleDataArray = [
  { Role_name: "Admin" },
  { Role_name: "Mentor" },
  { Role_name: "User" },
];

// createRoles(newRoleDataArray)
//   .then((createdRoles) => {
//     // Handle success
//     console.log("Roles created successfully:", createdRoles);
//   })
//   .catch((error) => {
//     // Handle error
//     console.error("Failed to create roles:", error);
//   });

async function addTable() {
  try {
    await sequelize.sync({ force: true });
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    sequelize.close();
  }
}

// async function dropTable() {
//   try {
//     await OrderItemsProduct.drop({ cascade: true });
//     await OrderProduct.drop({ cascade: true });
//     await Product.drop({ cascade: true });
//     await CatagoryProduct.drop({ cascade: true });
//     await User.drop({ cascade: true });
//     await Role.drop({ cascade: true });
//     console.log("All tables dropped!");
//   } catch (error) {
//     console.error("Error creating table:", error);
//   } finally {
//     sequelize.close();
//   }
// }
module.exports = { addTable };
