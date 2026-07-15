(function () {
  var CDN = "https://cdn.jsdelivr.net/npm/simple-icons@11.6.0/icons/";
  var stack = document.getElementById("tools-marquee-stack");
  if (!stack) return;

  var rows = [
    {
      direction: "up",
      tools: [
        { name: "AWS", slug: "amazonaws", border: "#ff9900", glow: "rgba(255, 153, 0, 0.32)" },
        { name: "Kubernetes", slug: "kubernetes", border: "#326de6", glow: "rgba(50, 109, 230, 0.32)" },
        { name: "Docker", slug: "docker", border: "#2496ed", glow: "rgba(36, 150, 237, 0.32)" },
        { name: "Terraform", slug: "terraform", border: "#844fba", glow: "rgba(132, 79, 186, 0.32)" },
        { name: "Linux", slug: "linux", border: "#facc15", glow: "rgba(250, 204, 21, 0.28)" }
      ]
    },
    {
      direction: "down",
      tools: [
        { name: "Git", slug: "git", border: "#f05033", glow: "rgba(240, 80, 51, 0.28)" },
        { name: "Jenkins", slug: "jenkins", border: "#d24939", glow: "rgba(210, 73, 57, 0.32)" },
        { name: "Prometheus", slug: "prometheus", border: "#e6522c", glow: "rgba(230, 82, 44, 0.32)" },
        { name: "Grafana", slug: "grafana", border: "#f46800", glow: "rgba(244, 104, 0, 0.32)" },
        { name: "GitHub", slug: "github", border: "#8b949e", glow: "rgba(139, 148, 158, 0.22)" }
      ]
    }
  ];

  function createTile(tool) {
    var tile = document.createElement("span");
    tile.className = "logo-tile";
    tile.style.setProperty("--brand-border", tool.border);
    tile.style.setProperty("--brand-glow", tool.glow);

    var img = document.createElement("img");
    img.src = CDN + tool.slug + ".svg";
    img.alt = tool.name;
    img.setAttribute("aria-hidden", "true");
    img.width = 30;
    img.height = 30;
    img.loading = "lazy";
    img.decoding = "async";

    tile.appendChild(img);
    return tile;
  }

  function createList(tools) {
    var list = document.createElement("ul");
    list.className = "logo-marquee__list logo-marquee__list--vertical";
    tools.forEach(function (tool) {
      var item = document.createElement("li");
      item.appendChild(createTile(tool));
      list.appendChild(item);
    });
    return list;
  }

  rows.forEach(function (row) {
    var marquee = document.createElement("div");
    marquee.className = "logo-marquee logo-marquee--vertical";
    marquee.setAttribute("data-marquee", "");

    var track = document.createElement("div");
    track.className = "logo-marquee__track logo-marquee__track--vertical logo-marquee__track--" + row.direction;

    var primary = createList(row.tools);
    var clone = createList(row.tools);
    clone.classList.add("logo-marquee__list--clone");
    clone.setAttribute("aria-hidden", "true");

    track.appendChild(primary);
    track.appendChild(clone);
    marquee.appendChild(track);
    stack.appendChild(marquee);
  });
})();
