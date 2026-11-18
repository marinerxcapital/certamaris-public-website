import Link from "next/link";

const image = "/redesign-bold/maritime-editorial-vessel.webp";
const DemoBadge = () => <span className="cm-demo-badge">DEMO DATA</span>;
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="cm-eyebrow">{children}</p>
);
const RequestDemo = () => (
  <Link href="/contact?intent=demo" className="cm-action">
    Request a demo
  </Link>
);

export function EditorialHome() {
  return (
    <div className="cm-home">
      <section className="cm-hero" aria-labelledby="cm-home-title">
        <div className="cm-container cm-hero-inner">
          <div className="cm-hero-copy">
            <Label>Maritime cyber assurance</Label>
            <h1 id="cm-home-title">
              Maritime cyber
              <br />
              readiness.
            </h1>
            <p className="cm-hero-subheading">Clear across your fleet.</p>
            <p className="cm-hero-description">
              Connect requirements, evidence and accountable
              <br className="cm-desktop-break" /> actions from company to
              vessel.
            </p>
            <div className="cm-actions">
              <RequestDemo />
              <Link className="cm-action cm-action-secondary" href="/platform">
                Explore the platform
              </Link>
            </div>
            <p className="cm-audience">
              For shipowners, operators, technical managers,
              <br className="cm-desktop-break" /> DPAs and maritime IT/OT
              leaders.
            </p>
          </div>
          <div className="cm-hero-art">
            <svg width="0" height="0" aria-hidden="true">
              <defs>
                <clipPath
                  id="cm-vessel-silhouette"
                  clipPathUnits="objectBoundingBox"
                >
                  <path d="M.235 0 H.904 V.912 Q.904 1 .852 1 H.183 Q.122 1 .096 .892 L.017 .615 Q-.009 .538 .017 .462 L.148 .092 Q.174 0 .235 0 Z" />
                </clipPath>
              </defs>
            </svg>
            {/* Supplied contextual artwork; not a customer installation. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cm-vessel-hero"
              src={image}
              width={1672}
              height={941}
              alt="Generated editorial artwork of a container vessel at sea"
              fetchPriority="high"
            />
            <figure className="cm-action-concept">
              <div className="cm-concept">
                <div className="cm-concept-label">
                  <Label>Corrective action</Label>
                  <DemoBadge />
                </div>
                <div className="cm-concept-heading">
                  <h2>Access review</h2>
                  <span>Verification pending</span>
                </div>
                <dl>
                  <dt>Owner</dt>
                  <dd>Vessel team</dd>
                  <dt>Linked evidence</dt>
                  <dd>Access review record</dd>
                </dl>
                <p className="cm-verification">Verification before closure.</p>
              </div>
              <figcaption>
                Illustrative interface concept · demo data
              </figcaption>
            </figure>
            <p className="cm-art-caption">
              Maritime context · generated editorial artwork
            </p>
          </div>
          <ol className="cm-hero-scope" aria-label="Assurance scope">
            <li>Company</li>
            <li>Fleet</li>
            <li>Vessel</li>
          </ol>
        </div>
      </section>
      <section
        className="cm-platform cm-container"
        id="capabilities"
        aria-labelledby="cm-platform-title"
      >
        <div className="cm-platform-heading">
          <div>
            <Label>The platform, connected</Label>
            <h2 id="cm-platform-title">One operating picture.</h2>
          </div>
          <p>
            Company, fleet and vessel work share
            <br className="cm-desktop-break" /> one controlled assurance record.
          </p>
        </div>
        <ol className="cm-scope-ribbon">
          {[
            ["Company", "Program, roles and deliverables"],
            ["Fleet", "Vessel readiness and open work"],
            ["Vessel", "Controls, evidence and actions"],
          ].map(([title, body]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="cm-evidence" id="sample-record">
          <div>
            <h3>
              Evidence has context.
              <br />
              Review keeps it useful.
            </h3>
            <p>
              Keep the custodian, review state and
              <br className="cm-desktop-break" /> linked work with the evidence
              record.
            </p>
          </div>
          <figure>
            <div className="cm-concept">
              <div className="cm-concept-label">
                <Label>Vessel / evidence</Label>
                <DemoBadge />
              </div>
              <h3 className="cm-evidence-title">Network segmentation</h3>
              <div className="cm-evidence-state">
                <p>Custodian · Vessel team</p>
                <span>Awaiting review</span>
              </div>
            </div>
            <figcaption>Illustrative interface concept · demo data</figcaption>
          </figure>
        </div>
        <div className="cm-workflow">
          <div className="cm-workflow-heading">
            <h3>From requirement to readiness.</h3>
            <Link href="/demo#scrub-tour">Follow the product tour →</Link>
          </div>
          <ol>
            {[
              ["Requirements", "Source and scope"],
              ["Evidence", "Review and freshness"],
              ["Findings", "Condition and context"],
              ["Corrective actions", "Ownership and verification"],
              ["Readiness packages", "QA and release"],
            ].map(([title, body]) => (
              <li key={title}>
                <h4>{title}</h4>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <p className="cm-qualification">
            Simplified overview. Applicability, controls, assessments, risk and
            QA remain part of the full record.
          </p>
        </div>
      </section>
      <section className="cm-operations" aria-labelledby="cm-operations-title">
        <div className="cm-container cm-operations-inner">
          <Label>Work that stays accountable</Label>
          <h2 id="cm-operations-title">Every action has a next step.</h2>
          <p className="cm-operations-intro">
            Keep the owner, supporting evidence and verification connected.
          </p>
          <div className="cm-operations-grid">
            <div className="cm-benefits">
              {[
                [
                  "See open work",
                  "Review findings and actions",
                  "with vessel context intact.",
                ],
                [
                  "Review the evidence",
                  "Keep freshness and reviewer",
                  "decisions with the record.",
                ],
                [
                  "Prepare for release",
                  "Bring approved work into",
                  "readiness preparation.",
                ],
              ].map(([title, line1, line2]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>
                    {line1}
                    <br />
                    {line2}
                  </p>
                </div>
              ))}
            </div>
            <figure>
              <div className="cm-product-frame">
                <div className="cm-product-label">
                  <span>Corrective actions · public product capture</span>
                  <DemoBadge />
                </div>
                <div className="cm-product-crop">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/redesign-bold/corrective-actions.png"
                    width={1440}
                    height={960}
                    alt="Authentic demo capture showing three corrective action rows with owners and review states"
                    loading="lazy"
                  />
                </div>
              </div>
              <figcaption>
                Authentic public product capture · demo data · cropped
              </figcaption>
              <a
                className="cm-full-capture"
                href="/product/dashboard-v2/corrective-actions.png"
              >
                View full product capture →
              </a>
            </figure>
          </div>
        </div>
        <div className="cm-diligence" id="buyer-diligence">
          <div className="cm-container cm-diligence-grid">
            <div>
              <Label>Enterprise evaluation</Label>
              <h3>Clarity for your review team.</h3>
              <p>Public information first. Scoped diligence when needed.</p>
            </div>
            <div>
              <h4>Security</h4>
              <p>Published control status.</p>
              <Link href="/security">Review security →</Link>
            </div>
            <div>
              <h4>Procurement</h4>
              <p>Evaluation materials.</p>
              <Link href="/trust/procurement">Explore procurement →</Link>
            </div>
          </div>
        </div>
      </section>
      <section
        className="cm-closing cm-container"
        aria-labelledby="cm-closing-title"
      >
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            width={490}
            height={620}
            alt="Generated maritime context: container vessel bow and deck at sea"
            loading="lazy"
          />
          <figcaption>
            Generated maritime context · illustrative artwork
          </figcaption>
        </figure>
        <div className="cm-closing-copy">
          <Label>See CertaMaris in context</Label>
          <h2 id="cm-closing-title">
            See assurance in
            <br />
            your fleet’s context.
          </h2>
          <p>
            Tell us your company, fleet size and what you want to review.
            <br className="cm-desktop-break" /> We’ll arrange a focused
            demonstration of the relevant workflows.
          </p>
          <RequestDemo />
          <p className="cm-follow-up">
            The team follows up by email to arrange a time.
          </p>
          <div className="cm-package">
            <h3>Fleet Core · Fleet Assurance · Enterprise</h3>
            <Link href="/pricing">View pricing and package details →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
