'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // source https://stackoverflow.com/questions/14212527/how-to-set-default-value-to-the-inputtype-date
    get formatDate() {
      return this.date.toISOString().substr(0, 10)
    }

    static associate(models) {
      // define association here
    }
    
    // Release 5
    // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
    static notifications() {
      return Art.findOne({
        attributes:[
          [sequelize.fn('COUNT', sequelize.col('id')), 'totalArt'],
          [sequelize.fn('MIN', sequelize.col('date')), 'oldDate'],
          [sequelize.fn('MAX', sequelize.col('date')), 'newDate']
        ]
      })
    }

  }

  Art.init(
    {
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    placeOfOrigin: DataTypes.STRING 
    }, 
    {
    sequelize,  
    modelName: 'Art',
    }
  );
  return Art;
};