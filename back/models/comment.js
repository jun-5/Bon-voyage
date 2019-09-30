module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { //테이블 생성
    content: {
      type: DataTypes.TEXT, // 긴 글
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Comment.associate = (db) => { //다른 테이블간의 관계를 나타낸다
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
