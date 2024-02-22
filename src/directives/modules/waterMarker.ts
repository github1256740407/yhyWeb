/*
    [指令]:v-waterMarker
    [参数]:
    [作用]:添加水印
    [使用示例]:
              <div
                v-waterMarker="{
                    text:'叶花弈'
                }"
              >...</div>
*/
import type { Directive, DirectiveBinding } from "vue";
const addWaterMarker = (
  parentNode: HTMLElement,
  text: string,
  font: any = "16px Microsoft JhengHei",
  textColor: string = "rgba(180, 180, 180, 0.3)"
) => {
  // 1.创建canvas的DOM
  const canvasDom: HTMLCanvasElement = document.createElement("canvas");
  // 2.将canvas加入节点之中
  parentNode.appendChild(canvasDom);
  // 3.设置canvas的DOM节点宽高,制作出单图
  canvasDom.width = 200;
  canvasDom.height = 150;
  canvasDom.style.display = "none";
  // 4.获取Canvas的2d上下文ctx
  const canvasCtx = canvasDom.getContext("2d") as CanvasRenderingContext2D;
  // 5.设置ctx倾斜
  canvasCtx.rotate((-20 * Math.PI) / 180);
  // 6.设置ctx字体,字体颜色,展示方位,对准基线,字体内容
  canvasCtx.font = font;
  canvasCtx.fillStyle = textColor;
  canvasCtx.textAlign = "left";
  canvasCtx.textBaseline = "Middle" as CanvasTextBaseline;
  canvasCtx.fillText(text, 0, canvasDom.height / 2);
  // 7.将节点的背景图替换成canvas,重复铺满
  parentNode.style.backgroundImage =
    "url(" + canvasDom.toDataURL("image/png") + ")";
};

const waterMarker: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { text, font, textColor } = binding.value;
    addWaterMarker(el, text, font, textColor);
  },
};

export default waterMarker;
