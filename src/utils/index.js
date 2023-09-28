export const getDateFormat = (date) => {
  let currentDate = date.toLocaleString("en-US", {
    weekday: "long",
  });
  if (
    new Date(date).toISOString().split("T")[0] ===
    new Date().toISOString().split("T")[0]
  ) {
    return "Today";
  } else if (
    new Date(date).toISOString().split("T")[0] ===
    new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  ) {
    return "Tomorrow";
  } else if (
    new Date(date).toISOString().split("T")[0] ===
    new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  ) {
    return "Yesterday";
  } else {
    return currentDate;
  }
};

export const getSVGCluster = (color) => {
  return window.btoa(`<svg width="100%" height="100%" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1663_205049)" transform="translate(0 0)">
<rect x="6" y="1" width="18" height="18" rx="9" fill="#${color}" shape-rendering="crispEdges"/>
<g filter="url(#filter1_d_1663_205049)">
<path d="M14.1057 25.2127C14.4743 25.9494 15.5257 25.9494 15.8943 25.2127L19.9049 17.1975C20.2376 16.5326 19.7541 15.75 19.0106 15.75L10.9894 15.75C10.2459 15.75 9.7624 16.5326 10.0951 17.1975L14.1057 25.2127Z" fill="#${color}"/>
<path d="M16.0061 25.2687C15.5914 26.0975 14.4086 26.0975 13.9939 25.2687L9.98332 17.2534C9.60903 16.5054 10.153 15.625 10.9894 15.625L19.0106 15.625C19.847 15.625 20.391 16.5054 20.0167 17.2534L16.0061 25.2687Z" stroke="inherit" stroke-width="0"/>
</g>
<rect x="6" y="1" width="18" height="18" rx="9" fill="#${color}"/>
<rect x="9" y="4" width="12" height="12" rx="6" fill="white"/>
<rect x="5.875" y="0.875" width="18.25" height="18.25" rx="9.125" stroke="inherit" stroke-width="0" shape-rendering="crispEdges"/>
</g>
<defs>
<filter id="filter0_d_1663_205049" x="2.75" y="0.75" width="24.5" height="31.2651" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1663_205049"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1663_205049" result="shape"/>
</filter>
<filter id="filter1_d_1663_205049" x="6.73779" y="15.5" width="16.5244" height="16.5151" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1663_205049"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1663_205049" result="shape"/>
</filter>
</defs>
</svg>
`);
};

export const getSVGMarker = (color) => {
  return window.btoa(`
  <svg
  width="40px"
  height="40px"
  viewBox="0 0 31 28"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g filter="url(#filter0_d_3672_24168)">
    <rect
      x="6.32349"
      y="1.12695"
      width="18"
      height="18"
      rx="9"
      fill="${color}"
      shape-rendering="crispEdges"
    />
    <g filter="url(#filter1_d_3672_24168)">
      <path
        d="M14.4292 25.3397C14.7978 26.0764 15.8492 26.0764 16.2178 25.3397L20.2284 17.3244C20.5611 16.6595 20.0776 15.877 19.3341 15.877L11.3129 15.877C10.5694 15.877 10.0859 16.6595 10.4186 17.3244L14.4292 25.3397Z"
        fill="${color}"
      />
      <path
        d="M16.3296 25.3956C15.9149 26.2244 14.7321 26.2244 14.3174 25.3956L10.3068 17.3804C9.93252 16.6323 10.4764 15.752 11.3129 15.752L19.3341 15.752C20.1705 15.752 20.7145 16.6323 20.3402 17.3804L16.3296 25.3956Z"
        stroke="#880E4F"
        stroke-width="0"
      />
    </g>
    <rect
      x="6.32349"
      y="1.12695"
      width="18"
      height="18"
      rx="9"
      fill="${color}"
    />
    <rect
      x="9.32349"
      y="4.12695"
      width="12"
      height="12"
      rx="6"
      fill="white"
    />
    <rect
      x="6.19849"
      y="1.00195"
      width="18.25"
      height="18.25"
      rx="9.125"
      stroke="#880E4F"
      stroke-width="0"
      shape-rendering="crispEdges"
    />
  </g>
  <defs>
    <filter
      id="filter0_d_3672_24168"
      x="3.07349"
      y="0.876953"
      width="24.5"
      height="31.2651"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dy="3" />
      <feGaussianBlur stdDeviation="1.5" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow_3672_24168"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow_3672_24168"
        result="shape"
      />
    </filter>
    <filter
      id="filter1_d_3672_24168"
      x="7.06128"
      y="15.627"
      width="16.5244"
      height="16.5151"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dy="3" />
      <feGaussianBlur stdDeviation="1.5" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow_3672_24168"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow_3672_24168"
        result="shape"
      />
    </filter>
  </defs>
</svg>
`);
};
