export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer sm:footer-horizontal p-10 rounded-box mt-6';

  const footerTemplates = [
    // v1
    `
    <nav>
      <h6 class="footer-title">Services</h6>
      <a class="link link-hover">Branding</a>
      <a class="link link-hover">Design</a>
      <a class="link link-hover">Marketing</a>
      <a class="link link-hover">Advertisement</a>
    </nav>
    <nav>
      <h6 class="footer-title">Company</h6>
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </nav>
    <nav>
      <h6 class="footer-title">Legal</h6>
      <a class="link link-hover">Terms of use</a>
      <a class="link link-hover">Privacy policy</a>
      <a class="link link-hover">Cookie policy</a>
    </nav>
    `,

    // v2 (with icon + company)
    `
    <aside>
      <svg width="50" height="50" viewBox="0 0 24 24" class="fill-current">
        <path d="..." />
      </svg>
      <p>ACME Industries Ltd.<br />Providing reliable tech since 1992</p>
    </aside>
    <nav>
      <h6 class="footer-title">Services</h6>
      <a class="link link-hover">Branding</a>
      <a class="link link-hover">Design</a>
      <a class="link link-hover">Marketing</a>
      <a class="link link-hover">Advertisement</a>
    </nav>
    <nav>
      <h6 class="footer-title">Company</h6>
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </nav>
    <nav>
      <h6 class="footer-title">Legal</h6>
      <a class="link link-hover">Terms of use</a>
      <a class="link link-hover">Privacy policy</a>
      <a class="link link-hover">Cookie policy</a>
    </nav>
    `,

    // v3 (newsletter)
    `
    <nav>
      <h6 class="footer-title">Services</h6>
      <a class="link link-hover">Branding</a>
      <a class="link link-hover">Design</a>
      <a class="link link-hover">Marketing</a>
      <a class="link link-hover">Advertisement</a>
    </nav>
    <nav>
      <h6 class="footer-title">Company</h6>
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </nav>
    <nav>
      <h6 class="footer-title">Legal</h6>
      <a class="link link-hover">Terms of use</a>
      <a class="link link-hover">Privacy policy</a>
      <a class="link link-hover">Cookie policy</a>
    </nav>
    <form>
      <h6 class="footer-title">Newsletter</h6>
      <fieldset class="w-80">
        <label>Enter your email address</label>
        <div class="join">
          <input type="text" placeholder="username@site.com" class="input input-bordered join-item" />
          <button class="btn btn-primary join-item">Subscribe</button>
        </div>
      </fieldset>
    </form>
    `,

    // v4 (with company icon + social links)
    `
    <aside>
      <svg width="50" height="50" viewBox="0 0 24 24" class="fill-current">
        <path d="..." />
      </svg>
      <p>ACME Industries Ltd.<br />Providing reliable tech since 1992</p>
    </aside>
    <nav>
      <h6 class="footer-title">Social</h6>
      <div class="grid grid-flow-col gap-4">
        <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
        <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
        <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
      </div>
    </nav>
    `,

    // v5 (centered copyright)
    `
    <footer class="footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>Copyright © ${new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
    `,

    // v6 (company + social)
    `
    <aside class="grid-flow-col items-center">
      <svg width="36" height="36" viewBox="0 0 24 24" class="fill-current">
        <path d="..." />
      </svg>
      <p>Copyright © ${new Date().getFullYear()} - All right reserved</p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
      <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
      <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
    </nav>
    `,

    // v7 (base-300 with social)
    `
    <nav>
      <h6 class="footer-title">Services</h6>
      <a class="link link-hover">Branding</a>
      <a class="link link-hover">Design</a>
      <a class="link link-hover">Marketing</a>
      <a class="link link-hover">Advertisement</a>
    </nav>
    <nav>
      <h6 class="footer-title">Company</h6>
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </nav>
    <nav>
      <h6 class="footer-title">Social</h6>
      <div class="grid grid-flow-col gap-4">
        <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
        <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
        <a><svg class="fill-current" width="24" height="24"><path d="..." /></svg></a>
      </div>
    </nav>
    `,

    // v8 (massive mega footer)
    `
    <footer class="grid-rows-2">
      <nav>
        <h6 class="footer-title">Services</h6>
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 class="footer-title">Company</h6>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 class="footer-title">Legal</h6>
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
      </nav>
      <nav>
        <h6 class="footer-title">Social</h6>
        <a class="link link-hover">Twitter</a>
        <a class="link link-hover">Instagram</a>
        <a class="link link-hover">Facebook</a>
        <a class="link link-hover">GitHub</a>
      </nav>
      <nav>
        <h6 class="footer-title">Explore</h6>
        <a class="link link-hover">Features</a>
        <a class="link link-hover">Enterprise</a>
        <a class="link link-hover">Security</a>
        <a class="link link-hover">Pricing</a>
      </nav>
      <nav>
        <h6 class="footer-title">Apps</h6>
        <a class="link link-hover">Mac</a>
        <a class="link link-hover">Windows</a>
        <a class="link link-hover">iPhone</a>
        <a class="link link-hover">Android</a>
      </nav>
    </footer>
    `
  ];

  const randomIndex = Math.floor(Math.random() * footerTemplates.length);
  footer.innerHTML = footerTemplates[randomIndex];
  console.log("Choose FOOTER ===================================", footerTemplates[randomIndex]);
  return footer;
}
