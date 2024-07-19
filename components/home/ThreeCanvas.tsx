import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, Center, Preload, Lightformer, Environment, CameraControls, RenderTexture, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import Turtle from './sandboxes/Turtle'
import { UserInfo, Skill } from "@/types";

export default function ThreeCanvas({ skills }: {
  skills: string[]
}) {
  function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
  return (
    <Canvas dpr={[1.5, 2]} camera={{ position: [0, 40, 30], fov: 45, near: 1, far: 300 }}>
      {/** The physics world */}
      {/** 物理引擎组件 */}
      <Physics gravity={[0, -30, 0]}>
        {/* <Letter char="VUE" position={[-50, 0, 0]} rotation={[0, 0, 0]}> */}
          {/** The sandboxes dropped into here have no idea what's going to happen.
               For all intents and purposes they're just self-contained components.  */}
          {/** 独立的物理组件  */}
          {/* <Turtle /> */}
        {/* </Letter> */}
        {skills.map((skill, index) => (
            <Letter char={skill} position={[randomNumber(-10, 10), 0, 0]} rotation={[0, 0, 0]}>
              <Turtle /> 
            </Letter>
        ))}
        {/** Invisible walls */}
        {/** 虚拟的碰撞墙 */}
        <CuboidCollider position={[0, -6, 0]}  args={[100, 1, 100]} />
        <CuboidCollider position={[0, 0, -30]} args={[30, 100, 1]} />
        <CuboidCollider position={[0, 0, 10]} args={[30, 100, 1]} />
        <CuboidCollider position={[-30, 0, 0]} args={[1, 100, 30]} />
        <CuboidCollider position={[30, 0, 0]} args={[1, 100, 30]} />
      </Physics>
      {/** Environment (for reflections) */}
      {/** <Environment> 组件，添加了一些矩形和圆形形状来改善反射效果创建了一个基于高动态范围图像（HDRI）的环境，并在其上添加了一些形状来产生更好的反射效果 */}
      <Environment files="/three/hdr/dancing_hall_1k.hdr" resolution={1024}>
        {/** On top of the HDRI we add some rectangular and circular shapes for nicer reflections */}
        {/* <group> 组件是 Three.js 中的一个组合组件，用于组织和变换子元素。在这个示例中，它用于将后续的形状组件组织在一起，并对它们进行旋转变换 */}
        <group rotation={[-Math.PI / 3, 0, 0]}>
          {/* <Lightformer> 组件，添加了一些矩形和圆形形状来改善反射效果 */}
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
          ))}
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
        </group>
      </Environment>
      {/** Contact shadows for naive soft shadows */}
      {/* <ContactShadows> 组件用于添加接触阴影效果 */}
      <ContactShadows smooth={false} scale={100} position={[0, -5.05, 0]} blur={0.5} opacity={0.75} />
      {/** Yomotsu/camera-controls, a better replacement for OrbitControls */}
      {/* <CameraControls> 组件用于控制相机的交互操作。可以替代 Three.js 中的 OrbitControls 组件 */}
      <CameraControls makeDefault dollyToCursor minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      {/** Makes sure everything is processed and GPU uploaded before Threejs "sees" it */}
      {/* <Preload> 组件用于确保所有资源（如模型、纹理等）在 Three.js 渲染之前都被加载和上传到 GPU */}
      <Preload all />
    </Canvas>
  )
}

function Letter({ char, children, stencilBuffer = false, ...props } : {
  char: string,
  children?: React.ReactNode,
  stencilBuffer?: boolean,
  position?: number[],
  rotation?: number[],
}) {
  const main = useRef() as any
  const contents = useRef() as any
  const events = useThree((state) => state.events)
  const controls = useThree((state) => state.controls) as any
  // The letters contents are moved to its whereabouts in world coordinates
  useFrame(() =>  contents.current.matrix.copy(main.current.matrixWorld))
  const RigidBodyComponent = RigidBody as any;
  return (
    /** A physics rigid body */
    <RigidBodyComponent restitution={0.1} colliders="cuboid" {...props}>
      {/** Center each letter */}
      <Center ref={main as any}>
        <Text3D
          bevelEnabled
          onDoubleClick={(e) => (e.stopPropagation(), controls.fitToBox(main.current, true))}
          font="/three/bold.blob"
          smooth={1}
          scale={0.125}
          size={40}
          height={4}
          curveSegments={10}
          bevelThickness={10}
          bevelSize={2}
          bevelOffset={0}
          bevelSegments={5}>
          {char}
          <MeshTransmissionMaterial clearcoat={1} samples={3} thickness={40} chromaticAberration={0.25} anisotropy={0.4}>
            {/** Render a portalled scene into the "buffer" attribute of transmission material, which is a texture.
                 Since we're moving the contents with the letter shape in world space we take the standard event compute. */}
            <RenderTexture attach="buffer" stencilBuffer={stencilBuffer} width={512} height={512} compute={events.compute as any}>
              {/** Everything in here is self-contained, behaves like a regular canvas, but we're *in* the texture */}
              <color attach="background" args={['#4899c9']} />
              <group ref={contents as any} matrixAutoUpdate={false}>
                {/** Drop the children in here, this is where the sandboxes land. */}
                {children}
              </group>
              <Preload all />
            </RenderTexture>
          </MeshTransmissionMaterial>
        </Text3D>
      </Center>
    </RigidBodyComponent>
  )
}
