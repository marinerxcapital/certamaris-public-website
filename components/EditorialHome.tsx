import Link from "next/link";
import { SAMPLE_RECORD, SAMPLE_RECORD_VESSEL, type SampleRecordObject } from "@/lib/sample-record";
import { HomeActionPanel, HomeVessel } from "./HomeMotion";
import styles from "./EditorialHome.module.css";

const demoHref = "/contact?intent=demo";
const demoChainHref = "/demo#chain-inspector";
const reportsHref = "/platform/reports-readiness";
const action = SAMPLE_RECORD.find((record) => record.code === "CAP")!;
const finding = SAMPLE_RECORD.find((record) => record.code === "FND")!;
const evidence = SAMPLE_RECORD.find((record) => record.code === "EVD")!;
const review = SAMPLE_RECORD.find((record) => record.code === "QA")!;
const pkg = SAMPLE_RECORD.find((record) => record.code === "PKG")!;
const due = action.fields.find(([label]) => label === "Due")![1];
const criterion = finding.fields.find(([label]) => label === "Criterion")![1];
const verification =
  "An updated firewall rule-review log still needs to be attached and verified.";
const releaseDecision = `Independent QA confirmed the record chain was complete and that evidence was current or covered by a documented exception. ${pkg.id} disclosed ${action.id} as open and recorded its owner, due date, and remaining verification.`;

export function EditorialHome() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="cm-home-title">
        <HomeVessel>
          <div className={styles.shell}>
            <p className={styles.eyebrow}>Maritime cyber assurance</p>
            <h1 id="cm-home-title" className={styles.headline}>
              See what’s ready.
              <span>See what’s still open.</span>
            </h1>
            <p className={styles.summary}>
              Trace vessel evidence, findings, and corrective actions to the
              fleet readiness package you share.
            </p>
            <div className={styles.buttons}>
              <a className={styles.primary} href="#sample-record">
                Explore the sample package
              </a>
              <Link className={styles.secondary} href={demoHref}>
                Request a demo
              </Link>
            </div>
          </div>
        </HomeVessel>
      </section>

      <section className={styles.package} id="capabilities" aria-labelledby="sample-record">
        <div className={styles.shell}>
          <div className={styles.packageIntro} id="evidence-chain">
            <p className={styles.packageLabel}>
              <span className={styles.demo}>Demo data</span>
              {SAMPLE_RECORD_VESSEL}
            </p>
            <h2 className={styles.sectionTitle} id="sample-record" tabIndex={-1}>
              Sample Fleet<br />Readiness Package
            </h2>
            <p className={styles.release}>
              <span>{pkg.statusLabel}</span> · 1 disclosed open action
            </p>
          </div>

          <div className={styles.stage}>
            <article className={styles.document} aria-label="Released sample package">
              <div className={styles.documentTop}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/homepage-motion/certamaris-logo.webp" alt="CertaMaris" width={960} height={153} />
                <p>{pkg.id} / V1.0 <span>Illustrative version</span></p>
              </div>
              <div className={styles.documentCover}>
                <p className={styles.eyebrow}>Fleet readiness</p>
                <h3>{SAMPLE_RECORD_VESSEL}</h3>
                <p>Q2 evidence review</p>
              </div>
              <dl className={styles.documentFacts}>
                <div><dt>Review scope</dt><dd>Bridge network and engine-monitoring VLAN</dd></div>
                <div><dt>QA disposition</dt><dd>{review.id} · Passed completeness check</dd></div>
                <div><dt>Release disclosure</dt><dd>{action.id} · Open pending verification</dd></div>
              </dl>
            </article>

            <article className={styles.action} aria-labelledby="home-action-title">
              <div className={styles.actionTop}>
                <p className={styles.recordId}>{action.id}</p>
                <span className={styles.status}>{action.statusLabel}</span>
              </div>
              <h3 id="home-action-title">{verification}</h3>
              <dl className={styles.actionFacts}>
                <div><dt>Finding</dt><dd>{finding.id}</dd></div>
                <div><dt>Owner</dt><dd>{action.owner}</dd></div>
                <div><dt>Due</dt><dd>{due}</dd></div>
              </dl>
              <HomeActionPanel>
                <p className={styles.recordId}>{action.id} · Corrective action</p>
                <h2 id="home-record-title">{verification}</h2>
                <dl className={styles.panelFacts}>
                  <div><dt>Finding</dt><dd>{finding.id}</dd></div>
                  <div><dt>Owner</dt><dd>{action.owner}</dd></div>
                  <div><dt>Due</dt><dd>{due}</dd></div>
                  <div><dt>Disposition</dt><dd>{action.statusLabel}</dd></div>
                </dl>
                <section className={styles.panelSection}>
                  <p className={styles.recordId}>{finding.id} · Finding</p>
                  <h3>{finding.title}</h3>
                  <p>The rule set was last reviewed two quarters ago. {criterion}.</p>
                </section>
                <section className={styles.panelSection}>
                  <p className={styles.recordId}>{evidence.id} · Accepted for the Q2 review</p>
                  <h3>Evidence reviewed</h3>
                  <p>The reviewer accepted the versioned switch configuration export and network diagram v7 for the segmentation review.</p>
                </section>
                <section className={styles.panelSection}>
                  <p className={styles.recordId}>Outstanding verification</p>
                  <h3>Updated firewall rule-review log</h3>
                  <p>Fleet IT/OT must attach the updated log. A reviewer must verify it before closing {action.id}.</p>
                </section>
                <section className={styles.panelSection}>
                  <p className={styles.recordId}>{review.id} · {pkg.id}</p>
                  <h3>Disclosed at release</h3>
                  <p>{releaseDecision}</p>
                </section>
                <div className={styles.proofLinks}>
                  <Link href={demoChainHref}>Inspect the public demo chain <span aria-hidden="true">→</span></Link>
                  <Link href={reportsHref}>Reports &amp; Readiness <span aria-hidden="true">→</span></Link>
                </div>
              </HomeActionPanel>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.brief} aria-labelledby="home-decision-title">
        <div className={`${styles.shell} ${styles.briefGrid}`}>
          <div>
            <p className={styles.eyebrow}>The release decision</p>
            <h2 className={styles.sectionTitle} id="home-decision-title">QA passed.<br />The action stayed open.</h2>
            <p className={styles.summary}>{releaseDecision}</p>
            <div className={styles.proofLinks}>
              <Link href={demoChainHref}>Inspect the public demo chain <span aria-hidden="true">→</span></Link>
              <Link href={reportsHref}>Reports &amp; Readiness <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <ul className={styles.trace} aria-label="Records behind the release">
            {([
              [finding, finding.title],
              [evidence, evidence.title],
              [action, "Updated rule-review log awaiting verification"],
              [review, "Completeness check passed"],
              [pkg, "One disclosed open action"],
            ] satisfies [SampleRecordObject, string][]).map(([record, description]) => (
              <li key={record.id}>
                <Link href={`/demo?stage=${record.code}#chain-inspector`}>
                  <span className={styles.traceHeading}>
                    {record.step}<span>{record.id}</span>
                  </span>
                  <span className={styles.traceSummary}>{description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav
        className={`${styles.shell} ${styles.evaluation}`}
        id="buyer-diligence"
        aria-label="Enterprise evaluation"
      >
        <p>Enterprise evaluation</p>
        <Link href="/demo#scrub-tour">Product tour</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/security">Security</Link>
        <Link href="/trust/procurement">Procurement</Link>
      </nav>

      <section className={styles.handoff} aria-labelledby="home-demo-title">
        <div className={`${styles.shell} ${styles.handoffInner}`}>
          <div>
            <h2 id="home-demo-title">See it with your fleet.</h2>
            <p>Walk through your evidence, exceptions, and reporting needs with CertaMaris.</p>
          </div>
          <Link className={styles.primary} href={demoHref}>Request a demo</Link>
        </div>
      </section>
    </div>
  );
}
