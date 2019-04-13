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

    this.hemisphereLight;
    this.shadowLight;
  }

  init() {
    // シーン,カメラ,レンダラーを作成
    this.createScene();
    // ライトを作成
    this.createLight();
  }

  handleWindowResize() {
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
  }

  createScene() {
    /**
     * シーン
     */
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    /**
     * カメラ
     */
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

    /**
     * レンダラー
     */
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMap.enabled = true;

    // DOM
    const container = document.getElementById("app");
    container.appendChild(this.renderer.domElement);

    // ウィンドウをリサイズしたときに表示サイズを更新
    window.addEventListener("resize", this.handleWindowResize, false);
  }

  createLight() {
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

    /**
     * 影
     */
    this.shadowLight = new THREE.DirectionalLight(0xfffff, 0.9);
    let { position, castShadow, shadow } = this.shadowLight;
    position.set(150, 350, 350);
    castShadow = true;

    // 領域
    shadow.camera.left = -400;
    shadow.camera.right = 400;
    shadow.camera.top = 400;
    shadow.camera.bottom = -400;
    shadow.camera.near = 1;
    shadow.camera.far = 1000;

    // 解像度
    shadow.mapSize.width = 2048;
    shadow.mapSize.height = 2048;

    // 有効化
    this.scene.add(this.hemisphereLight);
    this.scene.add(this.shadowLight);
  }
}

// 実行
window.addEventListener("load", new Aviator(), false);
