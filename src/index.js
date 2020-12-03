import {API_URL} from "./constants";
import './styles/main.scss';

const app = {
    posts: [],
    loadData: url =>
        fetch(url)
            .then((response) => response.json())
            .then((data) => app.posts = data.data.posts)
            .catch((e) => console.log(e)),
    renderData: () => {
        const root = document.getElementById('root');
        root.innerHTML = '';
        const container = document.createElement('div')
        container.className = 'container'
        app.posts.forEach((post, index) => {
            const cardContainer = document.createElement('article');
            cardContainer.className = 'card-container ' + index;
            const cardHashtags = document.createElement('div');
            cardHashtags.className = 'card-hashtags ' + index;
            cardHashtags.innerText = post?.text;
            const userAvatar = document.createElement('img');
            userAvatar.className = 'user-avatar ' + index;
            userAvatar.src = post?.authorimage;
            userAvatar.onclick = () => window.open(post?.sourcelink);
            cardContainer.append(userAvatar, cardHashtags);
            container.append(cardContainer);
        })
        const spinner = document.querySelector('.spinner');
        spinner && spinner.parentNode.removeChild(spinner);
        root.append(container)
    },
    render: () => {
        const root = document.getElementById('root');
        const spinner = document.createElement('img');
        spinner.className = 'spinner';
        spinner.src = './icons/spinner.gif';
        root.append(spinner);
    },
    init: (url, interval) => {
        app.render();
        setInterval(async () => {
            await app.loadData(url);
            app.renderData();
        }, interval)
    },
};
app.init(API_URL, 30000);