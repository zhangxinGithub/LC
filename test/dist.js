'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const obj={
//     name:'objName',
//     say(){
//         console.log(this.name)
//     },
//     read:()=>{
//         console.log(this.name)
//     }
// };
// obj.say();
// obj.read();
// console.log(this); // {}
// function test() {
//     console.log(this);
// }
// //test(); //global
// test();
/**
 * @component 第一个设计蓝图
 * @author 张鑫
 * @parm {
 *          name:String  名称 (选填)
 *          age:number or String  年纪(选填)
 *
 *       }
 */
;(function () {
    var Father = function () {
        function Father() {
            _classCallCheck(this, Father);

            var _default = {
                name: '张氏家族',
                age: '0',
                language: '中文',
                address: '山东',
                container: document.getElementById('manager')
            };
            Object.assign(this, _default, arguments[0]);
            if (this.container === null) {
                throw new Error('name:' + this.name + '\u7684\u7EC4\u4EF6\u672A\u627E\u5230\u6E32\u67D3\u5BB9\u5668');
            }
            this.init();
        }

        _createClass(Father, [{
            key: 'createButton',
            value: function createButton() {
                var _this = this;

                var btn = document.createElement('button');
                btn.innerText = '按钮';
                this.container.appendChild(btn);
                btn.addEventListener('click', function () {
                    _this.buttonClick();
                }, false);
            }
        }, {
            key: 'buttonClick',
            value: function buttonClick() {
                console.log(this);
            }
        }, {
            key: 'sayName',
            value: function sayName() {
                console.log(this.name);
                this.container.innerHTML = this.name;
            }
        }, {
            key: 'sayAge',
            value: function sayAge() {
                console.log(this.age);
            }
        }, {
            key: 'sayEnglish',
            value: function sayEnglish() {
                console.log(this.language);
            }
        }, {
            key: 'init',
            value: function init() {}
        }]);

        return Father;
    }();

    window.Father = Father;
})();

(function () {
    var Son = function (_Father) {
        _inherits(Son, _Father);

        function Son(name, age) {
            _classCallCheck(this, Son);

            var _this2 = _possibleConstructorReturn(this, (Son.__proto__ || Object.getPrototypeOf(Son)).call(this, name, age));

            var _default = {
                size: '20px'
            };
            Object.assign(_this2, _default, arguments[0]);
            _this2.init();
            return _this2;
        }

        _createClass(Son, [{
            key: 'createButton',
            value: function createButton() {
                var _this3 = this;

                this.btn = document.createElement('button');
                this.btn.innerText = '按钮';
                this.container.appendChild(this.btn);
                this.btn.addEventListener('click', function () {
                    _this3.buttonClick();
                }, false);
            }
        }, {
            key: 'changeColor',
            value: function changeColor() {
                this.btn.style.color = 'red';
            }
        }, {
            key: 'init',
            value: function init() {
                this.sayName();
                this.createButton();
                this.changeColor();
                this.container.style.fontSize = this.size;
            }
        }]);

        return Son;
    }(Father);

    var setName = function setName(name) {
        this.name = name;
    };
    Father.prototype.createButton = function () {
        var _this4 = this;

        var btn = document.createElement('button');
        btn.innerText = '文本';
        btn.style.background = 'blue';
        this.container.appendChild(btn);
        btn.addEventListener('click', function () {
            _this4.buttonClick();
        }, false);
    };
    var laoZhang = new Father({ name: '大明', age: 49 });
    laoZhang.sayName();
    laoZhang.createButton();
    setName.call(laoZhang, '老明');
    var xiaoZhang = new Son({ name: '张鑫', age: 25, container: document.getElementById('container') });

    var fontSize = function fontSize(size) {
        this.container.style.fontSize = size;
    };
    setTimeout(function () {
        fontSize.call(xiaoZhang, '32px');
    }, 2000);
})();
