import "./styles.scss";
import THREE from "three";

class Aviator {
  constructor() {
    this.colors = {
      red: 0xf25e46,
      white: 0xd8d0d1,
      brown: 0x59332e,
      pink: 0xf5986e,
      brownDark: 0x23190f,
      blue: 0x68c3c0
    };

    // 画面サイズ
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer;
    this.camera;
  }

  init() {
    this.createScene();
  }

  // ウィンドウをリサイズしたときの表示サイズの更新
  handleWindowResize() {
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
  }

  // シーン,カメラ,レンダラーを作成
  createScene() {
    // シーン
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // カメラ
    const aspectRatio = this.WIDTH / this.HEIGHT;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 10000;
    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    this.camera.position.x = 0;
    this.camera.position.z = 200;
    this.camera.position.y = 100;

    // レンダラー
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMap.enabled = true;

    // DOM
    const container = document.getElementById("app");
    container.appendChild(this.renderer.domElement);

    // リサイズ時
    window.addEventListener("resize", this.handleWindowResize, false);
  }
}

// 実行
window.addEventListener("load", new Aviator(), false);
