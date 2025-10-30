import React from "react";
import { BrandImg } from "../../../components/BrandImg";

export const metadata = {
  title: "Sample Audit Report",
};

export default function SampleAudit() {
  return (
    <article>
      <header className="mb-8">
        <BrandImg src="/brand/covers/flat_cover.svg" alt="Audit Cover" className="cover" />
        <h1 className="mt-6 text-4xl font-semibold">Sample Audit Report</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">October 2025</p>
      </header>

      {/* Audit metadata */}
      <section className="space-y-1 text-sm">
        <p>
          <strong>Project:</strong> <span className="font-medium">Demo Token</span>
        </p>
        <p>
          <strong>Commit:</strong> <code>0xdeadbeef…1234</code>
        </p>
        <p>
          <strong>Chains Reviewed:</strong> Ethereum, Base
        </p>
        <p>
          <strong>Scope Type:</strong> Smart Contracts, Upgradeability
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2>Executive Summary</h2>
        <p>
          This document demonstrates how brand assets, fonts, and tables render on audit
          report pages. Icons and badges below are served from <code>/brand</code> paths.
        </p>

        <figure className="flex gap-4 items-center">
          <BrandImg src="/brand/badges/flat_independent.svg" alt="Independent Audit Badge" className="badge" />
          <BrandImg src="/brand/icon/icon-sev-critical.svg" alt="Critical Severity Icon" className="sev" />
          <BrandImg src="/brand/icon/icon-sev-medium.svg" alt="Medium Severity Icon" className="sev" />
        </figure>
      </section>

      {/* Severity counts table */}
      <section className="mt-10 space-y-4">
        <h2>Severity Breakdown</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Severity</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sev: "Critical", icon: "critical", count: 1 },
                { sev: "High", icon: "high", count: 0 },
                { sev: "Medium", icon: "medium", count: 1 },
                { sev: "Low", icon: "low", count: 1 },
                { sev: "Informational", icon: "info", count: 2 },
              ].map((row) => (
                <tr key={row.sev}>
                  <td>
                    <span className="inline-flex items-center gap-1">
                      <BrandImg
                        src={`/brand/icon/icon-sev-${row.icon}.svg`}
                        alt={row.sev}
                        className="sev"
                      />
                      {row.sev}
                    </span>
                  </td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed findings */}
      <section className="mt-10 space-y-6">
        <h2>Detailed Findings</h2>

        <div className="space-y-2">
          <h3 id="FND-001" className="text-xl font-semibold">
            FND-001 — Insecure Default Credentials
          </h3>
          <p>
            <strong>Severity:</strong> Critical &nbsp; | &nbsp; <strong>Status:</strong> Open
          </p>
          <p>
            The upgrade proxy owner is hard-coded to the deployer’s externally-owned account,
            allowing unilateral upgrades without multisig approval.
          </p>
          <p>
            <strong>Recommendation:</strong> Migrate ownership to a 2-of-3 multisig and enforce
            a mandatory delay via a timelock controller.
          </p>
        </div>

        <div className="space-y-2">
          <h3 id="FND-002" className="text-xl font-semibold">
            FND-002 — Missing Rate Limiting on Login Endpoint
          </h3>
          <p>
            <strong>Severity:</strong> Medium &nbsp; | &nbsp; <strong>Status:</strong> Resolved
          </p>
          <p>
            The off-chain authentication API allowed unlimited password attempts which could lead
            to credential-stuffing attacks. A middleware layer now enforces exponential back-off.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="mt-10 space-y-4">
        <h2>Audit Methodology</h2>
        <p>
          The engagement combined manual code review, invariant reasoning, differential testing,
          and extensive fuzzing over 150k generated transactions. Static-analysis tooling (Slither
          &amp; Echidna) flagged 23 informational issues; only those with concrete impact are
          included in this report.
        </p>
      </section>

      {/* Final posture */}
      <section className="mt-10 space-y-4">
        <h2>Final Posture Assessment</h2>
        <p>
          After remediation, the codebase meets industry standards for upgradeable ERC-20 tokens
          with time-locked governance. Residual risks are documented and accepted by the client.
        </p>
      </section>

      {/* Signature & badge */}
      <section className="mt-10 space-y-2 text-center">
        <BrandImg src="/brand/badges/flat_independent.svg" alt="Independent Audit Badge" className="badge mx-auto" />
        <p className="text-sm">Mony Vault — Blockchain Security Research</p>
        <p className="text-sm">
          <a href="https://monygroup.net/secure" className="underline">
            https://monygroup.net/secure
          </a>
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2>Findings Overview</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Severity</th>
                <th>Finding</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <BrandImg src="/brand/icon/icon-sev-critical.svg" alt="Critical" className="sev" />
                </td>
                <td>Insecure default credentials</td>
                <td>Open</td>
              </tr>
              <tr>
                <td>
                  <BrandImg src="/brand/icon/icon-sev-medium.svg" alt="Medium" className="sev" />
                </td>
                <td>Missing rate limiting on login endpoint</td>
                <td>Resolved</td>
              </tr>
              <tr>
                <td>
                  <BrandImg src="/brand/icon/icon-sev-low.svg" alt="Low" className="sev" />
                </td>
                <td>Outdated third-party dependency</td>
                <td>Accepted Risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Example code block */}
      <section className="mt-10 space-y-4">
        <h2>Reference Exploit PoC</h2>
        <pre>
          <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";

contract Exploit is Test {
    address vault = 0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000;

    function run() external {
        /*
         * Step 1: Call emergencyWithdraw()
         * Step 2: Take ownership
         */
         (bool ok, ) = vault.call(abi.encodeWithSignature("emergencyWithdraw()"));
         require(ok, "failed");
    }
}`}</code>
        </pre>
      </section>

      <footer className="mt-16 text-xs text-gray-500 dark:text-gray-400">
        <p>
          <span className="copyleft">&copy;</span> 2025 Mony Group — Example report for
          demonstration purposes only.
        </p>
      </footer>
    </article>
  );
}
