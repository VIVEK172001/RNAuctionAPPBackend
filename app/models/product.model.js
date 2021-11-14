module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      userid:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      productname: {
        type: Sequelize.STRING
      },
      baseamount: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.STRING
      },
      endTimeHour:{
        type:Sequelize.INTEGER,
      },
      endTimeMinute:{
        type:Sequelize.INTEGER,
      },
      publisheddate:{
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      }
    });
  
    return Product;
  };