import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//imported three.js



//get canvas where  3d object ploated 


let display = document.getElementById('canvas');



//create Scene 

const  Scene= new THREE.Scene()

//create a shape                                                                                          


//create gemo 
const texture = new THREE.TextureLoader()
let rectTexture= texture.load('door.jpg' ); 
let sphereTexture= texture.load('map.jpg')


const shapeGeo= new THREE.BoxGeometry(40,1,1,2,2,2);

const shapeMaterial = new THREE.MeshBasicMaterial({map:rectTexture})
const mesh = new THREE.Mesh(shapeGeo,shapeMaterial)
mesh.position.y=5
mesh.position.x=-10
const spahreMaterial = new THREE.MeshBasicMaterial({map:sphereTexture})
const sphereGeo =  new THREE.SphereGeometry( 15, 32, 16 )
const spheremesh= new THREE.Mesh(sphereGeo,spahreMaterial) 
Scene.add(spheremesh)
// Scene.add(mesh)
//add camera 

const camera = new THREE.PerspectiveCamera(75,1.2,)
Scene.add(camera)

camera.position.set(1,33,0)
camera.lookAt(spheremesh)

const group = new THREE.Group();
group.add(spheremesh)
group.add(mesh)
Scene.add(group)
// Scene.position.set(4,2,3)
/**
 * group two item in three.js
 */

// const helper = new THREE.CameraHelper( camera );
// Scene.add( helper );
//orbit control
const controls = new OrbitControls( camera, display );
controls.update();
controls.enableDamping=true;

const rendrer= new THREE.WebGLRenderer({
    canvas:display
})

//if device pixel ratio is higher then 2 then default value will be 2
  rendrer.setPixelRatio(Math.min(...[window.devicePixelRatio,2]))

rendrer.setSize(800,600)

// let position=0.1


// //create own geo


// // create a simple square shape. We duplicate the top left and bottom right
// // vertices because each vertex needs to appear once per triangle.
// const vertices = new Float32Array( [
// 	0, 1,  0, // v0
// 	 1, 0,  0, // v1
// 	 1,  0,  1, // v2
// ] );

// // itemSize = 3 because there are 3 values (components) per vertex
// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const meshTriangle = new THREE.Mesh( geometry, material );
// Scene.add(meshTriangle)
// const color=['#ff0000','#00ff00','#0000ff','#00fbff']
// for(let i=0;i<200;i++){
//     let randomIndex= Math.floor(Math.random()*color.length)
//     const geometry = new THREE.BufferGeometry();
//     const vertices = new Float32Array( [
// 	(Math.random()-0.5)*4,(Math.random()-0.5)*4,(Math.random()-0.5)*4, // v0
// 	 (Math.random()-0.5)*4, (Math.random()-0.5)*4,  (Math.random()-0.5)*4, // v1
// 	 (Math.random()-0.5)*4,  (Math.random()-0.5)*4,  (Math.random()-0.5)*4, // v2
// ] );
// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
// const material = new THREE.MeshBasicMaterial( { color: color[randomIndex] ,wireframe:true} );
// const meshTriangle = new THREE.Mesh( geometry, material );
// Scene.add(meshTriangle)
// }

const tick = () => {
    // position=position+0.2;
    group.rotation.x += 0.01;
	group.rotation.y += 0.01;
    // mesh.position.y= Math.sin(position)
    // console.log('hello')
    requestAnimationFrame(tick );
    controls.update();
    rendrer.render(Scene,camera)
    rendrer.setPixelRatio(Math.min(...[window.devicePixelRatio,2]))

}


tick()