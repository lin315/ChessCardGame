cc.Class({
    extends: cc.Component,

    properties: {
        // 麻将牌
        mahjongCard: cc.Prefab,
        // 我的手牌
        mineHandleLayout: cc.Node,
        mineDeskLayout: cc.Node,
        // 我下家的手牌，左手边
        leftHandleLayout: cc.Node,
        leftDeskLayout: cc.Node,
        // 我对家的手牌，
        topHandleLayout: cc.Node,
        topDeskLayout: cc.Node,
        // 我上家的手牌
        rightHandleLayout: cc.Node,
        rightDeskLayout: cc.Node,
        // 所有麻将的图片
        cardSpriteAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        mineHandleCards: [],
        leftHandleCards: [],
        topHandleCards: [],
        rightHandleCards: [],


    },

    // use this for initialization
    onLoad: function () {
        this.currentIndex = 0;
        this.deskCard;
        // 生成一副牌
        this.allCards = new Array("tong1", "tong1", "tong1", "tong1", "tong2", "tong2", "tong2", "tong2", "tong3", "tong3", "tong3", "tong3", "tong4", "tong4", "tong4", "tong4", "tong5", "tong5", "tong5", "tong5", "tong6", "tong6", "tong6", "tong6", "tong7", "tong7", "tong7", "tong7", "tong8", "tong8", "tong8", "tong8", "tong9", "tong9", "tong9", "tong9", "tiao1", "tiao1", "tiao1", "tiao1", "tiao2", "tiao2", "tiao2", "tiao2", "tiao3", "tiao3", "tiao3", "tiao3", "tiao4", "tiao4", "tiao4", "tiao4", "tiao5", "tiao5", "tiao5", "tiao5", "tiao6", "tiao6", "tiao6", "tiao6", "tiao7", "tiao7", "tiao7", "tiao7", "tiao8", "tiao8", "tiao8", "tiao8", "tiao9", "tiao9", "tiao9", "tiao9", "wang1", "wang1", "wang1", "wang1", "wang2", "wang2", "wang2", "wang2", "wang3", "wang3", "wang3", "wang3", "wang4", "wang4", "wang4", "wang4", "wang5", "wang5", "wang5", "wang5", "wang6", "wang6", "wang6", "wang6", "wang7", "wang7", "wang7", "wang7", "wang8", "wang8", "wang8", "wang8", "wang9", "wang9", "wang9", "wang9");

        // var RuleUtils=require("RuleUtils") ;
        // this.ruleUtils=new RuleUtils();
        // this.ruleUtils.gong();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    /**
     * 从网络获取自己的手牌，现在逻辑为随机生成牌
     */
    dispatchCards: function () {

        // ["tong1", "tong1", "tong1", "tong1", "tong2", "tong2", "tong2", "tong2", "tong3", "tong3", "tong3", "tong3", "tong4", "tong4", "tong4", "tong4", "tong5", "tong5", "tong5", "tong5", "tong6", "tong6", "tong6", "tong6", "tong7", "tong7", "tong7", "tong7", "tong8", "tong8", "tong8", "tong8", "tong9", "tong9", "tong9", "tong9", "tiao1", "tiao1", "tiao1", "tiao1", "tiao2", "tiao2", "tiao2", "tiao2", "tiao3", "tiao3", "tiao3", "tiao3", "tiao4", "tiao4", "tiao4", "tiao4", "tiao5", "tiao5", "tiao5", "tiao5", "tiao6", "tiao6", "tiao6", "tiao6", "tiao7", "tiao7", "tiao7", "tiao7", "tiao8", "tiao8", "tiao8", "tiao8", "tiao9", "tiao9", "tiao9", "tiao9", "wang1", "wang1", "wang1", "wang1", "wang2", "wang2", "wang2", "wang2", "wang3", "wang3", "wang3", "wang3", "wang4", "wang4", "wang4", "wang4", "wang5", "wang5", "wang5", "wang5", "wang6", "wang6", "wang6", "wang6", "wang7", "wang7", "wang7", "wang7", "wang8", "wang8", "wang8", "wang8", "wang9", "wang9", "wang9", "wang9"];
        // 洗牌
        var totalCards = this.allCards.length;
        for (var i = 0; i < 1000; i++) {
            var randomNum1 = Math.floor(cc.random0To1() * totalCards);
            var randomNum2 = Math.floor(cc.random0To1() * totalCards);
            var card1 = this.allCards[randomNum1];
            this.allCards[randomNum1] = this.allCards[randomNum2];
            this.allCards[randomNum2] = card1;

        }


        // 发牌，每家十三张,以自己为庄家，先发自己的牌，
        // TODO：按照顺序发，不按照线下打麻将的方式发
        for (var i = 0; i < 13; i++) {
            this.mineHandleCards[i] = this.allCards[i * 4 + 0];
            this.leftHandleCards[i] = this.allCards[i * 4 + 1];
            this.topHandleCards[i] = this.allCards[i * 4 + 2];
            this.rightHandleCards[i] = this.allCards[i * 4 + 3];
        }
        // 当前发放到了第多少张牌
        this.currentIndex = 13 * 4;

        // 庄家多发一张
        // this.currentIndex = 13 * 4 ;
        // this.mineHandleCards[13] = this.allCards[this.currentIndex];


        // 排序，先排花色，然后再插入排序相同的

        this.mineHandleCards.sort();
        cc.log("我手上的牌" + this.mineHandleCards);
        cc.log(this.mineHandleCards);
    },






    deal: function () {
        cc.log("开始发牌了");
        this.dispatchCards();
        // 显示自己的手牌
        this.showMineHandleMahjong();
        // 显示下家的手牌
        this.showLeftHandleMahjong();
        // 显示对家的手牌
        this.showTopHandleMahjong();
        // 显示下家的手牌
        this.showRightHandleMahjong();



    },
    /**
         * 显示自己的牌的方法
         */
    showMineHandleMahjong: function () {
        for (var i = 0; i < this.mineHandleCards.length; i++) {
            this.createMineHandleMahjong(i);

        }
    },

    /**
     * 计算自己某一张的牌的方法
     */
    createMineHandleMahjong: function (index) {
        var mahjong = cc.instantiate(this.mahjongCard);
        // mahjong.SpriteFrame=this.cardSpriteAtlas.getSpriteFrame("big_chun");
        // this.testSprite=this.cardSpriteAtlas.getSpriteFrame("big_chun");
        var mahjongJs = mahjong.getComponent("Mahjong");
        // cc.log("这次要发的牌是" + index + "    " + "big_" + this.mineHandleCards[index]);
        mahjongJs.content.spriteFrame = this.cardSpriteAtlas.getSpriteFrame("big_" + this.mineHandleCards[index]);
        mahjongJs.cardName = this.mineHandleCards[index];
        cc.log(mahjongJs);
        // cc.log("麻将的名字" + mahjong.name);

        this.mineHandleLayout.addChild(mahjong);
        // this.mineDeskLayout.addChild(mahjong);

        // cc.log(this.mineHandleLayout);


        cc.log(this.mineHandleCards.length);
        // 1.计算出总长度
        // 2.计算出最左边的位置
        // 3.最左边的位置逐个加上单位长度
        var totalLength = this.mineHandleCards.length * 72;
        var maxLeftPosition = -totalLength / 2;
        mahjong.setPosition(maxLeftPosition + 72 * index, -280);
        // cc.log(mahjong);
        // cc.log("麻将的横坐标" + mahjong.getPosition());

        var self = this;
        mahjong.on('mousedown', function (event) {


            var mineAllMahjongs = self.mineHandleLayout.children;
            cc.log(mineAllMahjongs == null);
            cc.log("子节点数量为：" + mineAllMahjongs.length);
            for (var i = 0; i < mineAllMahjongs.length; i++) {
                var mahjongCard = mineAllMahjongs[i];
                var mahjongCardJS = mahjongCard.getComponent("Mahjong");
                if (mahjongCardJS.isChoose) {
                    mahjongCardJS.isChoose = false;
                    mahjongCard.y -= 20;
                }
            }

            // cc.log("我全部的麻将数量"+mineAllMahjongs.length);

            if (mahjongJs.isChoose) {
                mahjongJs.isChoose = false;
                mahjong.y -= 20;
            } else {
                mahjongJs.isChoose = true;

                mahjong.y += 20;
            }
        });

        return mahjong;
    },
    /**
     * 显示下家的麻将
     */
    showLeftHandleMahjong: function () {
        for (var i = 0; i < this.leftHandleCards.length; i++) {
            this.createleftHandleMahjong(i);
        }
    },
    /**
     * 创建下家的麻将
     */
    createleftHandleMahjong: function (index) {
        var node = new cc.Node('Sprite');
        var leftCard = node.addComponent(cc.Sprite);
        leftCard.spriteFrame = this.cardSpriteAtlas.getSpriteFrame("mj_c");
        this.leftHandleLayout.addChild(node);


        var height = 28;
        var totalLength = this.leftHandleCards.length * height;
        var maxBottomPosition = totalLength / 2;
        node.setPosition(-580, maxBottomPosition - height * index);

    },
    /**
     * 显示右边的麻将
     */
    showRightHandleMahjong: function () {
        for (var i = 0; i < this.rightHandleCards.length; i++) {
            this.createRightHandleMahjong(i);
        }
    },
    /**
     * 创建右边的麻将并且给安排位置
     */
    createRightHandleMahjong: function (index) {

        var node = new cc.Node('Sprite');
        var leftCard = node.addComponent(cc.Sprite);
        leftCard.spriteFrame = this.cardSpriteAtlas.getSpriteFrame("mj_c");
        this.rightHandleLayout.addChild(node);


        var height = 33;
        var totalLength = this.rightHandleCards.length * height;
        var maxBottomPosition = totalLength / 2;
        node.setPosition(580, maxBottomPosition - height * index);
        node.rotation = 180;
    },

    /**
     * 显示对家的麻将
     */
    showTopHandleMahjong: function () {
        for (var i = 0; i < this.topHandleCards.length; i++) {
            this.createTopHandleMahjong(i);
        }
    },
    /**
     * 创建对爱的麻将，并且给显示位置
     */
    createTopHandleMahjong: function (index) {

        var node = new cc.Node('Sprite');
        var leftCard = node.addComponent(cc.Sprite);
        leftCard.spriteFrame = this.cardSpriteAtlas.getSpriteFrame("mj_b");
        this.topHandleLayout.addChild(node);


        var width = 30;
        var totalLength = this.topHandleCards.length * width;
        var maxLeftPosition = -totalLength / 2;
        node.setPosition(maxLeftPosition + width * index, 200);
    },

    onActionClick: function (event) {
        // cc.log(event.target);
        cc.log(event.target.name);
        var CHOW = "chow";
        var PONG = "pong";
        var GONG = "gong";
        var GOING_OUT = "goingOut";
        if (CHOW == event.target.name) {
            this.chow(this.deskCard, this.mineHandleCards);
        } else if (PONG == event.target.name) {
            this.pong(this.deskCard, this.mineHandleCards);

        } else if (GONG == event.target.name) {

        } else if (GOING_OUT == event.target.name) {

        }
    },

    /**
 * 从桌上摸一张牌
 */
    getCardFromDesk: function (cardName) {
        // 摸桌上最新的那张牌
        var cardName = this.allCards[this.currentIndex];
        this.deskCard = cardName;
        //桌上牌的引索值往后移一位
        this.currentIndex++;
        this.showCurrentGetCard(cardName);

    },

    /**
     * 显示刚刚从桌上摸的牌
     */
    showCurrentGetCard: function (cardName) {
        var mahjong = cc.instantiate(this.mahjongCard);
        var mahjongJs = mahjong.getComponent("Mahjong");
        mahjongJs.content.spriteFrame = this.cardSpriteAtlas.getSpriteFrame("big_" + cardName);
        mahjongJs.cardName = cardName;
        cc.log(mahjongJs);
        // cc.log("麻将的名字" + mahjong.name);

        this.mineHandleLayout.addChild(mahjong);

        cc.log(this.mineHandleCards.length);
        // 1.计算出总长度
        // 2.计算出最左边的位置
        // 3.最左边的位置逐个加上单位长度
        var totalLength = this.mineHandleCards.length * 72;
        var maxLeftPosition = -totalLength / 2;
        // 放在第十四张牌还过去20像素的位置
        mahjong.setPosition(maxLeftPosition + 72 * 14, -280);
        mahjongJs.isChoose = true;
        mahjong.y += 10;

        var self = this;
        mahjong.on('mousedown', function (event) {


            var mineAllMahjongs = self.mineHandleLayout.children;
            cc.log(mineAllMahjongs == null);
            cc.log("子节点数量为：" + mineAllMahjongs.length);
            for (var i = 0; i < mineAllMahjongs.length; i++) {
                var mahjongCard = mineAllMahjongs[i];
                var mahjongCardJS = mahjongCard.getComponent("Mahjong");
                if (mahjongCardJS.isChoose) {
                    mahjongCardJS.isChoose = false;
                    mahjongCard.y -= 20;
                }
            }

            // cc.log("我全部的麻将数量"+mineAllMahjongs.length);

            if (mahjongJs.isChoose) {
                mahjongJs.isChoose = false;
                mahjong.y -= 20;
            } else {
                mahjongJs.isChoose = true;

                mahjong.y += 20;
            }
        });
    },

    /**
     * 别人打一张牌到桌子上
     */
    sendCardToDesk: function () {

    },
    /**
     * 判断手上的牌能否吃桌上的牌
     */
    chow: function (deskCard, handleCards) {
        // 统计
        var type = deskCard.substring(0, deskCard.length - 1);
        var point = deskCard.substring(deskCard.length - 1, deskCard.length);
        var pointNumber = parseInt(point);
        var hasLittleeTwoStep = this.hasSameCard(type + (pointNumber - 2), handleCards);;
        var hasLittleeOneStep = this.hasSameCard(type + (pointNumber - 1), handleCards);;
        var hasBiggerOneStep = this.hasSameCard(type + (pointNumber + 1), handleCards);;
        var hasBiggerTwoStep = this.hasSameCard(type + (pointNumber + 2), handleCards);;

        cc.log(type + (pointNumber - 2) + ":" + hasLittleeTwoStep);
        cc.log(type + (pointNumber - 1) + ":" + hasLittleeOneStep);
        cc.log(type + (pointNumber + 1) + ":" + hasBiggerOneStep);
        cc.log(type + (pointNumber + 2) + ":" + hasBiggerTwoStep);

    },
    /**
     * 统计一手牌里面是否有该张牌
     */
    hasSameCard: function (cardName, handleCards) {
        cc.log(handleCards);
        for (var i = 0; i < handleCards.length; i++) {
            cc.log("统计的牌是：" + cardName);
            cc.log("手上的这张牌是：" + handleCards[i]);
            cc.log(cardName == handleCards[i]);

            if (cardName == handleCards[i]) {
                return true;
            }
        }
        return false;
    },
    /**
     * 统计一手牌里面有多少张与给出的牌一样的牌
     */
    countNumberOfSameCard: function (cardName, handleCards) {
        cc.log("统计的牌是：" + cardName);

        var sameCardNumber = 0;
        for (var i = 0; i < handleCards.length; i++) {
            if (cardName == handleCards[i]) {
                sameCardNumber++;
            }
        }
        return sameCardNumber;
    },
    /**
     * 判断手上的牌能否碰桌上的牌
     */
    pong: function (deskCard, handleCards) {
        // 我手上的牌，如果跟桌上的牌一样，且有两张的时候，这个时候可以碰
        //  同样的
        if (hasSameCard(deskCard, handleCards) == 2) {
            cc.log("可以碰");
        }

    },

    /**
     * 判断手上的牌能否杠桌上的牌
     */
    gong: function (deskCard, handleCards) {

    },
    /**
     * 判断手上的牌能否胡桌上的牌
     */
    goingOut: function (deskCard, handleCards) {

    },
});
