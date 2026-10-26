import test from 'node:test';
import assert from 'node:assert/strict';
import { createAnimationBudget, hasUsefulStarfieldArea, isSoftwareGraphics } from '../lib/animation-budget.mjs';

test('tiny slivers below the fold do not start a full canvas animation', () => {
  assert.equal(hasUsefulStarfieldArea(940,873),false);
  assert.equal(hasUsefulStarfieldArea(900,875),false);
  assert.equal(hasUsefulStarfieldArea(900,600),true);
  assert.equal(hasUsefulStarfieldArea(400,300),true);
  assert.equal(hasUsefulStarfieldArea(900,0),true);
  assert.equal(hasUsefulStarfieldArea(0,0),false);
});
test('normal motion continues and transient stalls recover', () => {
  const budget=createAnimationBudget();
  for(let i=0;i<100;i++)assert.equal(budget.record(4,42),false);
  assert.equal(budget.record(90,200),false);
  assert.equal(budget.record(4,42),false);
  assert.equal(budget.record(4,3000),false);
  assert.equal(budget.limited,false);
});
test('persistent CPU or frame-latency overload freezes decorative work', () => {
  for(const sample of [[90,42],[2,300]]){
    const budget=createAnimationBudget();
    assert.equal(budget.record(...sample),false);
    assert.equal(budget.record(...sample),false);
    assert.equal(budget.record(...sample),true);
    assert.equal(budget.record(2,42),true);
  }
});
test('software graphics uses a static visual; real or unknown GPUs keep motion', () => {
  for(const name of ['ANGLE (Google, Vulkan SwiftShader Device)','llvmpipe (LLVM 18)','Microsoft Basic Render Driver','Software Renderer'])assert.equal(isSoftwareGraphics(name),true);
  for(const name of ['',null,'WebKit WebGL','ANGLE (NVIDIA GeForce RTX)','Apple M2','Intel Iris Xe'])assert.equal(isSoftwareGraphics(name),false);
});
