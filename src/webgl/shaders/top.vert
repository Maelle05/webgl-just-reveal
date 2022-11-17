precision highp float;

varying vec2 vUv;

void main() {
   vUv = uv;
   
	// vec4 pos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

   vec4 mvPosition = vec4( position, 1.0 );
   mvPosition = instanceMatrix * mvPosition;

    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;

}
