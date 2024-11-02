s.boot;
(
SynthDef.new("tutorial-args", { arg freq = 440, out = 0;
    Out.ar(out, SinOsc.ar(freq, 0, 0.2));
}).play;
)
s.scope; // scope so you can see the effect
x = Synth.new("tutorial-args");
x.set("freq", 660);
x.set("freq", 880, "out", 1);
