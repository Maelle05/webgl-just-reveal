precision highp float;

varying vec2 vUv;

void main() {

//    float distanceFromX = distance(uOriginX, vUv.x);
//    float distanceFromY = distance(uOriginY + .5, vUv.x) * 1.;
//    vec3 color = vec3(0., 0., 1. - distanceFromY).rgb;

   gl_FragColor = vec4(1., vUv, 1.);
}
