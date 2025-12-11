# Sample Audit Report

![Cover](/brand/covers/min_cover.svg)

October 2025

## Executive Summary

This document demonstrates how brand assets, fonts, and tables render on audit report pages. Icons and badges below are served from `/brand` paths.

![Independent Audit Badge](/brand/badges/flat_independent.svg) ![Critical](/brand/icon/icon-sev-critical.svg) ![Medium](/brand/icon/icon-sev-medium.svg)

## Severity Breakdown

| Severity | Count |
| --- | --- |
| ![Critical](/brand/icon/icon-sev-critical.svg) Critical | 1 |
| ![High](/brand/icon/icon-sev-high.svg) High | 0 |
| ![Medium](/brand/icon/icon-sev-medium.svg) Medium | 1 |
| ![Low](/brand/icon/icon-sev-low.svg) Low | 1 |
| ![Informational](/brand/icon/icon-sev-info.svg) Informational | 2 |

## Detailed Findings

### FND-001 — Insecure Default Credentials

**Severity:** Critical | **Status:** Open

The upgrade proxy owner is hard-coded to the deployer's externally-owned account, allowing unilateral upgrades without multisig approval.

**Recommendation:** Migrate ownership to a 2-of-3 multisig and enforce a mandatory delay via a timelock controller.

### FND-002 — Missing Rate Limiting on Login Endpoint

**Severity:** Medium | **Status:** Resolved

The off-chain authentication API allowed unlimited password attempts which could lead to credential-stuffing attacks. A middleware layer now enforces exponential back-off.

## Reference Exploit PoC

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exploit {
    address vault = 0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000;

    function run() external {
        /*
         * Step 1: Call emergencyWithdraw()
         * Step 2: Take ownership
         */
        (bool ok, ) = vault.call(abi.encodeWithSignature("emergencyWithdraw()"));
        require(ok, "failed");
    }
}
```

## Final Posture Assessment

After remediation, the codebase meets industry standards for upgradeable ERC-20 tokens with time-locked governance. Residual risks are documented and accepted by the client.

<div align="center">
  <img src="/brand/badges/flat_independent.svg" alt="Independent Audit Badge" />

  **Mony Vault — Blockchain Security Research**  
  <https://monygroup.net/secure>
</div>

