// ########################################################
// script pour le projet sur les PFAS de Champolution
// ########################################################
// a faire: au lieu de prendre les deux derniers en mémoire -> attendre que chaque item de la liste apparaissent avant de pouvoir réapparaitre


const pfasButton = document.getElementById('pfasButton');
const pfasCard = document.getElementById('pfasCard');
let lastShownIndex = -1;
let previousShownIndex = -1;

pfasButton.addEventListener('click', () => {
    // Toujours afficher le loader au premier clic
    pfasCard.classList.remove('hidden');
    pfasCard.style.opacity = '1'; // S'assurer que le card soit visible immédiatement
    pfasCard.innerHTML = '<div class="loader"><i class="fas fa-spinner fa-spin text-green-600 text-4xl"></i></div>';

    // Simuler un léger délai de chargement avant d'afficher le PFAS
    setTimeout(() => {
        // Charger un PFAS aléatoire
        fetch('ressources/pfasList.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors du chargement du JSON');
                }
                return response.json();
            })
            .then(data => {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * data.pfas_fiches.length);
                } while (randomIndex === lastShownIndex || randomIndex === previousShownIndex);
                
                // Mettez à jour les index précédents
                previousShownIndex = lastShownIndex;
                lastShownIndex = randomIndex;

                const pfas = data.pfas_fiches[randomIndex];
                
                // Remplir la carte PFAS avec les données aléatoires, y compris l'image
                pfasCard.innerHTML = `
                    <h3 class="text-xl font-semibold mb-4">Exemple de PFAS de la vie de tous les jours</h3>
                    <div class="space-y-3 text-left">
                        <img src="${pfas.image_url}" class="w-60 mx-auto border-2 border-green-600 rounded-md" alt="Image montrant un exemple d'utilisation du PFAS en question">
                        <p>
                            <span class="text-gray-400">Nom du polluant :</span> 
                            <span class="font-semibold text-green-600">${pfas.nom_du_produit}</span>
                        </p>
                        <p>
                            <span class="text-gray-400">Nom scientifique :</span> 
                            <span class="font-semibold text-green-600">${pfas.nom_scientifique}</span>
                        </p>
                        <p>
                            <span class="text-gray-400">Utilisation :</span> 
                            <span class="font-semibold">${pfas.utilisation}</span>
                        </p>
                        <p>
                            <span class="text-gray-400">Impact :</span> 
                            <span class="font-semibold">${pfas.impact}</span>
                        </p>
                    </div>
                `;

                // Animation d'apparition
                pfasCard.classList.remove('opacity-0');
                pfasCard.classList.remove('scale-95');
            })
            .catch(error => {
                console.error('Erreur lors du chargement du fichier JSON :', error);
                pfasCard.innerHTML = '<p class="text-red-600">Erreur lors du chargement des données. Veuillez réessayer plus tard.</p>';
            });
    }, 500); // Délai de 500ms pour l'effet de chargement
});

const style = document.createElement('style');
style.textContent = `
    .writing-mode-vertical {
        writing-mode: vertical-rl;
        text-orientation: mixed;
    }
    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
`;
document.head.appendChild(style);