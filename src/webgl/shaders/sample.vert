precision highp float;

varying vec2 vUv;

void main() {
   vUv = uv;
   
	 vec4 pos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
   gl_Position = pos;
}
