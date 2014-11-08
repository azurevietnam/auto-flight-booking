'use strict';

window.init = function() {
    document.getElementById('version-number').innerText = 'v' + pb.version;

    var previousVersions = document.getElementsByClassName('version'),
        latestContainer = document.getElementById('latest-version');

    latestContainer.appendChild(previousVersions[0]).classList.add('latest');

    document.getElementById('previous-versions-label').innerText = 'Previous Versions'; //text.get('changelog_previous_versions');

    var previousContainer = document.getElementById('previous-versions'),
        previousContainer_ShowHide = document.getElementById('show-hide');

    previousContainer_ShowHide.innerText = 'Show'; //text.get('changelog_showhide_show');

    document.getElementById('previous-versions-link').onclick = function() {
        if (previousContainer.style.display === 'block') {
            previousContainer.style.display = 'none';
            previousContainer_ShowHide.innerText = 'Show'; //text.get('changelog_showhide_show');
        } else {
            previousContainer.style.display = 'block';
            previousContainer_ShowHide.innerText = 'Hide'; //text.get('changelog_showhide_hide');
        }
    };

    document.getElementById('logo-link').href = pb.www;

    var links = document.getElementsByTagName('a'), link;
    for (var i = 0, len = links.length; i < len; i++) {
        if (!(link = links[i]).onclick && !link.target) {
            link.target = '_blank';
        }
    }
};