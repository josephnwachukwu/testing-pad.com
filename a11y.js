const a11y = require('a11y');
 
a11y('http://invoicer.me', (err, reports) => {
    const audit = reports.audit; // `a11y` Formatted report
    const report = reports.report; // DevTools Accessibility Audit formatted report
    console.log(audit)
});