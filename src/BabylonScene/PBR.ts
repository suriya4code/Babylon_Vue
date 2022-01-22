import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, CubeTexture, PBRMaterial, Texture, Color3, GlowLayer } from "@babylonjs/core";

export class PBR{

    scene: Scene;
    engine : Engine;

    constructor(private canvas:HTMLCanvasElement){
        this.engine = new Engine(this.canvas,true);
        this.scene = this.CreateScene();
        this.CreateEnvironment();


        this.engine.runRenderLoop(()=>{
            this.scene.render();
        })
    }

    CreateScene():Scene{
     const scene = new Scene(this.engine);
     const camera = new FreeCamera("camera",new Vector3(0,1,-5), this.scene);
     camera.attachControl();
     camera.speed = 0.25;

     const hemiLight = new HemisphericLight("hemilight",new Vector3(0,1,0), this.scene);
     hemiLight.intensity = 0;

     const envTxt = CubeTexture.CreateFromPrefilteredData("./environment/sky.env" , scene)
     scene.environmentTexture = envTxt;
     scene.createDefaultSkybox(envTxt,true);



     return scene;
    }

    CreateEnvironment():void{
        const ground = MeshBuilder.CreateGround("ground",{width:10,height:10},this.scene);
     
        const ball = MeshBuilder.CreateSphere("ball",{diameter:1},this.scene);
        ball.position = new Vector3(0,1,0);
        ground.material = this.CreateAsphalt();
        ball.material = this.CreateMagic();

    }

    CreateAsphalt():PBRMaterial{
        const pbr = new PBRMaterial("pbr",this.scene);
        pbr.roughness = 1;
        pbr.albedoTexture = new Texture("./textures/asphalt/asphalt_diffuse.jpg",this.scene)
        pbr.bumpTexture = new Texture("./textures/asphalt/asphalt_normal.jpg",this.scene)
        pbr.metallicTexture = new Texture("./textures/asphalt/asphalt_ao.jpg",this.scene)

        pbr.useAmbientOcclusionFromMetallicTextureRed = true;
        pbr.useRoughnessFromMetallicTextureGreen = true;
        pbr.useMetallnessFromMetallicTextureBlue = true;

        pbr.invertNormalMapX= true;
        pbr.invertNormalMapY= true;

        return pbr;
    }

    CreateMagic():PBRMaterial{
        const pbr = new PBRMaterial("pbr",this.scene);
        pbr.albedoTexture = new Texture("./textures/magic/glow_tex.jpg",this.scene)
        pbr.bumpTexture = new Texture("./textures/magic/glow_tex.jpg",this.scene)
        pbr.metallicTexture = new Texture("./textures/magic/glow_tex.jpg",this.scene)
        pbr.emissiveTexture = new Texture("./textures/magic/glow_tex.jpg",this.scene)

        // pbr.emissiveColor = new Color3(1,1,1);
        // pbr.emissiveIntensity = 3;


        pbr.useAmbientOcclusionFromMetallicTextureRed = true;
        pbr.useRoughnessFromMetallicTextureGreen = true;
        pbr.useMetallnessFromMetallicTextureBlue = true;

        pbr.invertNormalMapX= true;
        pbr.invertNormalMapY= true;

        const glowLayer = new GlowLayer("glow",this.scene);
        glowLayer.intensity = 3;

        pbr.roughness = 1;

        return pbr;
    }
}