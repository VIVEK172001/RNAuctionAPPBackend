module.exports = (sequelize, Sequelize) => {
    const Winner = sequelize.define("winners", {
      userid:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      productid:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      bidproductname: {
        type: Sequelize.STRING
      },
      soldamount: {
        type: Sequelize.STRING
      },
      solddate: {
        type: Sequelize.DATE
      },
      winnername:{
        type: Sequelize.STRING
      }
    });
  
    return Winner;
  };