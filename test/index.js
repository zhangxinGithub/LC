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
    class Father {
        constructor() {
            let _default = {
                name: '张氏家族',
                age: '0',
                language: '中文',
                address: '山东',
                container: document.getElementById('manager')
            };
            Object.assign(this, _default, arguments[0]);
            if (this.container === null) {
                throw new Error(`name:${this.name}的组件未找到渲染容器`);
            }
            this.init()
        }

        createButton() {
            let btn = document.createElement('button');
            btn.innerText = '按钮';
            this.container.appendChild(btn);
            btn.addEventListener('click', () => {
                this.buttonClick()
            }, false);
        }

        buttonClick() {
            console.log(this)
        }

        sayName() {
            console.log(this.name);
            this.container.innerHTML = this.name;
        }

        sayAge() {
            console.log(this.age)
        }

        sayEnglish() {
            console.log(this.language)
        }

        init() {
        }
    }

    window.Father = Father
})();

(function () {
    class Son extends Father {
        constructor(name, age) {
            super(name, age);
            let _default = {
                size: '20px'
            };
            Object.assign(this, _default, arguments[0]);
            this.init()
        }

        createButton() {
            this.btn = document.createElement('button');
            this.btn.innerText = '按钮';
            this.container.appendChild(this.btn);
            this.btn.addEventListener('click', () => {
                this.buttonClick()
            }, false);
        };

        changeColor() {
            this.btn.style.color = 'red'
        };

        init() {
            this.sayName();
            this.createButton();
            this.changeColor();
            this.container.style.fontSize = this.size
        }
    }

    let setName = function (name) {
        this.name = name;

    };
    Father.prototype.createButton = function () {
        let btn = document.createElement('button');
        btn.innerText = '文本';
        btn.style.background = 'blue';
        this.container.appendChild(btn);
        btn.addEventListener('click', () => {
            this.buttonClick()
        }, false);
    };
    let laoZhang = new Father({name: '大明', age: 49});
    laoZhang.sayName();
    laoZhang.createButton();
    setName.call(laoZhang, '老明');
    let xiaoZhang = new Son({name: '张鑫', age: 25, container: document.getElementById('container')});

    let fontSize = function (size) {
        this.container.style.fontSize = size
    };
    setTimeout(() => {
        fontSize.call(xiaoZhang, '32px');
    }, 2000);

})();
