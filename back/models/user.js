module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // 테이블명은 users
    nickname: {
      type: DataTypes.STRING(20), // 20글자 이하
      allowNull: false, // 필수
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true, // 고유한 값
    },
    password: {
      type: DataTypes.STRING(100), // 100글자 이하
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장돼요
  });

  User.associate = (db) => { //이부분은 sequelize를 사용하여 테이블간의 관계를 구현한 코드입니다. 하지만, 완벽한 이해를 하지 못하였습니다. Nodejs교과서 교재 참고하였습니다.
    db.User.hasMany(db.Post, { as: 'Posts' });
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
  };

  return User;
};