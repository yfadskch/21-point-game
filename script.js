/* 通用样式 */
body {
    font-family: 'Arial', sans-serif;
    background: #f8f9fa;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #333;
}

.container {
    text-align: center;
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 90%;
    max-width: 500px;
}

header h1 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #007BFF;
}

.cards-container {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    gap: 10px; /* 增加卡牌间的默认间距 */
}

/* 卡牌样式 */
.card-display {
    width: 100px;
    height: 140px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #ffffff, #e8e8e8);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    border: 2px solid #007BFF;
}

/* 翻转动画样式 */
.flip-card-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease-in-out;
    transform-style: preserve-3d;
    position: relative;
}

.flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
}

.flip-card-back {
    transform: rotateY(180deg);
    background: #ffffff;
}

/* 按钮样式 */
.bet-controls button,
.guess-btn {
    background: #ffc107;
    color: #333;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    margin: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.bet-controls button:hover,
.guess-btn:hover {
    background: #e0a800;
}

.message {
    margin: 20px 0;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

/* 手机版本优化 */
@media (max-width: 768px) {
    .cards-container {
        flex-direction: column; /* 卡牌垂直布局 */
        align-items: center;
        gap: 20px; /* 增加卡牌之间的垂直间距 */
    }

    .card-display {
        width: 90px; /* 缩小卡牌宽度 */
        height: 130px; /* 缩小卡牌高度 */
    }
}
