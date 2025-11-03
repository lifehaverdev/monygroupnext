#!/usr/bin/env node
/**
 * Verifies that React modules resolve from node_modules, not next/dist/compiled
 */

const path = require('path');

function verifyReactPath(moduleName) {
  try {
    const resolved = require.resolve(moduleName);
    const isFromNodeModules = resolved.includes('node_modules');
    const isFromNextCompiled = resolved.includes('next/dist/compiled');
    
    console.log(`${moduleName}:`);
    console.log(`  Resolved: ${resolved}`);
    console.log(`  From node_modules: ${isFromNodeModules ? '✓' : '✗'}`);
    console.log(`  From next/dist/compiled: ${isFromNextCompiled ? '✗ (ERROR)' : '✓ (correctly not here)'}`);
    console.log('');
    
    return { resolved, isFromNodeModules, isFromNextCompiled };
  } catch (error) {
    console.error(`Error resolving ${moduleName}:`, error.message);
    return { resolved: null, isFromNodeModules: false, isFromNextCompiled: false };
  }
}

console.log('Verifying React module resolution...\n');

const results = [
  verifyReactPath('react'),
  verifyReactPath('react-dom'),
  verifyReactPath('react-dom/client'),
];

const hasErrors = results.some(r => r.isFromNextCompiled || !r.isFromNodeModules);

if (hasErrors) {
  console.error('❌ FAILED: React modules are not resolving correctly');
  process.exit(1);
} else {
  console.log('✅ SUCCESS: All React modules resolve from node_modules');
  process.exit(0);
}

