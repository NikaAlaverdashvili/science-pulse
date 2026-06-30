import { Injectable, signal } from '@angular/core';
import { Post, PostCategory } from '../models/post.model';
import { Comment } from '../models/comment.model';

const SPACE_IMG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80';
const TECH_IMG = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80';
const HEALTH_IMG = 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80';
const ENV_IMG = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80';
const PHYS_IMG = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80';
const RES_IMG = 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80';

const SEED_POSTS: Post[] = [
  {
    id: 'post-001', image: SPACE_IMG,
    titleKa: 'ნასა-ს ახალი მისია: მარსზე სიცოცხლის ძიება',
    titleEn: 'NASA\'s New Mission: Search for Life on Mars',
    shortDescKa: 'ნასა-მ გამოაცხადა ახალი მისია, რომელიც მარსზე მიკრობული სიცოცხლის კვალს მოძებნის.',
    shortDescEn: 'NASA has announced a groundbreaking mission to search for microbial life traces on Mars.',
    contentKa: 'ნასა-ს მეცნიერებმა გამოაცხადეს ახალი კოსმოსური მისია "ართემის II", რომელიც 2026 წელს გაემართება. ამ მისიის ფარგლებში მეცნიერები გამოიყენებენ უახლეს ტექნოლოგიებს, რათა მარსის ნიადაგში მიკრობული სიცოცხლის ნიშნები მოძიებონ. ეს იქნება ადამიანთა ისტორიაში ყველაზე ამბიციური კოსმოსური მისია.\n\nმისიის დროს გამოყენებული იქნება ახალი თაობის სენსორები, რომლებიც ნიადაგის ნიმუშებს გაანალიზებენ. მეცნიერები განსაკუთრებულ ყურადღებას დაუთმობენ მარსის ქვეტყის ნიადაგს, სადაც წყლის ყოფნის ნიშნები ადრეც დაფიქსირდა.\n\nამ კვლევის შედეგები შეიძლება სამუდამოდ შეცვალოს ჩვენი გაგება სიცოცხლისა და სამყაროს შესახებ.',
    contentEn: 'NASA scientists have announced the new space mission "Artemis II", scheduled for 2026. During this mission, researchers will employ cutting-edge technologies to search for signs of microbial life in Martian soil. This will be the most ambitious space mission in human history.\n\nThe mission will use next-generation sensors to analyze soil samples collected from multiple sites. Scientists will pay special attention to subsurface soil where signs of water presence have been detected previously.\n\nThe results of this research could forever change our understanding of life and the universe. If microbial life is found, it would prove that life is not unique to Earth.',
    category: 'Space', authorId: 'admin-001', authorName: 'Nika Alaverdashvili',
    createdAt: new Date(Date.now() - 86400000).toISOString(), likes: [], dislikes: []
  },
  {
    id: 'post-002', image: TECH_IMG,
    titleKa: 'ხელოვნური ინტელექტი რევოლუციას ახდენს მედიცინაში',
    titleEn: 'Artificial Intelligence Revolutionizes Medicine',
    shortDescKa: 'AI სისტემებმა კიბოს ადრეული სტადიის დიაგნოსტიკაში 98% სიზუსტე მიაღწიეს.',
    shortDescEn: 'AI systems achieved 98% accuracy in early-stage cancer diagnosis, surpassing human doctors.',
    contentKa: 'ჯანდაცვის სფეროში ხელოვნური ინტელექტი სულ უფრო მნიშვნელოვან როლს ასრულებს. ახალი კვლევის მიხედვით, DeepMind-ის AI სისტემმა კიბოს ადრეული სტადიის გამოვლენაში 98%-იანი სიზუსტე მიაღწია, რაც გამოცდილ ქირურგებს გადააჭარბა.\n\nეს მიღწევა განსაკუთრებით მნიშვნელოვანია, რადგან ადრეულ სტადიაზე გამოვლენა სიცოცხლის გადარჩენის შანსს 5-ჯერ ზრდის. AI სისტემა გაწვრთნილი იყო 50 მილიონზე მეტ სამედიცინო გამოსახულებაზე.\n\nახლო მომავალში ეს ტექნოლოგია ხელმისაწვდომი გახდება მსოფლიო ჰოსპიტლებისთვის.',
    contentEn: 'Artificial intelligence is playing an increasingly important role in healthcare. According to a new study, DeepMind\'s AI system achieved 98% accuracy in early-stage cancer detection, surpassing experienced surgeons.\n\nThis achievement is particularly significant because early detection increases survival chances by 5 times. The AI system was trained on over 50 million medical images from hospitals worldwide.\n\nIn the near future, this technology will be made available to hospitals globally, potentially saving millions of lives annually. The system can analyze a scan in under 30 seconds compared to hours for human radiologists.',
    category: 'Technology', authorId: 'admin-001', authorName: 'Nika Alaverdashvili',
    createdAt: new Date(Date.now() - 172800000).toISOString(), likes: [], dislikes: []
  },
  {
    id: 'post-003', image: HEALTH_IMG,
    titleKa: 'ახალი ვაქცინა ალჰეიმერის წინააღმდეგ კლინიკური ცდებში',
    titleEn: 'New Alzheimer\'s Vaccine Enters Clinical Trials',
    shortDescKa: 'მეცნიერებმა შექმნეს ვაქცინა, რომელმაც ცხოველებში ალჰეიმერის პროგრესია 80%-ით შეამცირა.',
    shortDescEn: 'Scientists developed a vaccine that reduced Alzheimer\'s progression by 80% in animal studies.',
    contentKa: 'ალჰეიმერის დაავადების წინააღმდეგ ბრძოლაში დიდი წინსვლა მოხდა. ვაშინგტონის უნივერსიტეტის მეცნიერებმა შექმნეს ახალი ვაქცინა, რომელმაც ვირთხებზე ჩატარებულ ცდებში დაავადების პროგრესია 80%-ით შეამცირა.\n\nვაქცინა მუშაობს ბეტა-ამილოიდური ფოლაქების წარმოქმნის თავიდან ასაცილებლად, რომლებიც ალჰეიმერის ძირითადი გამომწვევია. ამჟამად ვაქცინა კლინიკური ცდების პირველ ფაზაში შევიდა.\n\nთუ ვაქცინა ეფექტური აღმოჩნდება, 2030 წლისთვის შეიძლება ხელმისაწვდომი გახდეს.',
    contentEn: 'A major breakthrough has occurred in the fight against Alzheimer\'s disease. Scientists at the University of Washington have developed a new vaccine that reduced disease progression by 80% in rat studies.\n\nThe vaccine works by preventing the formation of beta-amyloid plaques, which are the primary cause of Alzheimer\'s. The vaccine has now entered Phase 1 clinical trials with 200 participants aged 60-75.\n\nIf the vaccine proves effective, it could be available by 2030, potentially helping the 50 million people worldwide currently living with Alzheimer\'s disease.',
    category: 'Health', authorId: 'admin-001', authorName: 'Nika Alaverdashvili',
    createdAt: new Date(Date.now() - 259200000).toISOString(), likes: [], dislikes: []
  },
  {
    id: 'post-004', image: ENV_IMG,
    titleKa: 'ოკეანის დამცველი ბაქტერია: გარდამტეხი აღმოჩენა',
    titleEn: 'Ocean-Protecting Bacteria: A Groundbreaking Discovery',
    shortDescKa: 'მეცნიერებმა აღმოაჩინეს ბაქტერია, რომელიც ოკეანის პლასტიკს 48 საათში ანადგურებს.',
    shortDescEn: 'Scientists discovered bacteria that can destroy ocean plastic within 48 hours.',
    contentKa: 'ოკეანის დაბინძურებასთან ბრძოლაში გარდამტეხი სიახლე გახდა ცნობილი. ევროპელმა მეცნიერებმა ოკეანის სიღრმეში აღმოაჩინეს ახალი სახეობის ბაქტერია, რომელსაც შეუძლია პლასტიკის სრული დეგრადაცია მხოლოდ 48 საათში.\n\nბაქტერია გამოიმუშავებს სპეციალურ ფერმენტს, რომელიც პლასტიკის პოლიმერებს ანადგურებს. ლაბორატორიულ პირობებში ბაქტერიამ წარმატებით გაანადგურა ყველა ძირითადი სახეობის პლასტმასი.\n\nამ აღმოჩენამ შეიძლება გახსნას ახალი გზები ოკეანის პლასტიკური დაბინძურების პრობლემის გადასაჭრელად.',
    contentEn: 'A groundbreaking discovery has been made in the fight against ocean pollution. European scientists discovered a new species of bacteria in the ocean depths that can completely degrade plastic within just 48 hours.\n\nThe bacteria produces a special enzyme that breaks down plastic polymers into harmless organic compounds. In laboratory conditions, the bacteria successfully destroyed all major types of plastic, including PET, HDPE, and polystyrene.\n\nThis discovery could open new pathways to solving the ocean plastic pollution crisis, which currently affects over 8 million tons of plastic entering oceans each year.',
    category: 'Environment', authorId: 'admin-001', authorName: 'Nika Alaverdashvili',
    createdAt: new Date(Date.now() - 345600000).toISOString(), likes: [], dislikes: []
  },
  {
    id: 'post-005', image: PHYS_IMG,
    titleKa: 'კვანტური კომპიუტერი: ახალი მიღწევა',
    titleEn: 'Quantum Computer: New Breakthrough Achievement',
    shortDescKa: 'IBM-ის კვანტური კომპიუტერმა კლასიკური კომპიუტერებზე 1000-ჯერ სწრაფი გამოთვლა შეასრულა.',
    shortDescEn: 'IBM\'s quantum computer performed calculations 1000 times faster than classical computers.',
    contentKa: 'კვანტური გამოთვლების სფეროში მომხდარი გარდამტეხი მიღწევა მთელ სამეცნიერო სამყაროს განვითარებაზე მოახდენს გავლენას. IBM-ის ახალმა კვანტური პროცესორმა "Condor"-მა 1000-კუბიტური გამოთვლები ჩაატარა, რაც კლასიკური კომპიუტერებისთვის შეუძლებელი იყო.\n\nეს მიღწევა გახსნის ახალ შესაძლებლობებს კრიპტოგრაფიის, ფარმაცევტიკის, ფინანსების და ხელოვნური ინტელექტის სფეროებში.\n\n2030 წლისთვის, კვანტური კომპიუტერები შეძლებენ ისეთ პრობლემების გადაჭრას, რომელთა მოხსნა კლასიკური კომპიუტერებით მილიონობით წელს დასჭირდებოდა.',
    contentEn: 'A breakthrough in quantum computing will impact the entire scientific world. IBM\'s new quantum processor "Condor" performed 1000-qubit calculations that were impossible for classical computers.\n\nThis achievement will open new possibilities in cryptography, pharmaceuticals, finance, and artificial intelligence. The processor operates at near absolute zero temperature and maintains quantum coherence for record durations.\n\nBy 2030, quantum computers will be able to solve problems that would take classical computers millions of years, potentially revolutionizing drug discovery, climate modeling, and financial optimization.',
    category: 'Physics', authorId: 'admin-001', authorName: 'Nika Alaverdashvili',
    createdAt: new Date(Date.now() - 432000000).toISOString(), likes: [], dislikes: []
  },
  {
    id: 'post-006', image: RES_IMG,
    titleKa: 'ახალი კვლევა: ძილის ნაკლებობა 40%-ით ზრდის დიაბეტის რისკს',
    titleEn: 'New Study: Sleep Deprivation Increases Diabetes Risk by 40%',
    shortDescKa: 'Harvard-ის ახალი კვლევა ამტკიცებს, რომ 6 საათზე ნაკლები ძილი ტიპი-2 დიაბეტის რისკს მნიშვნელოვნად ზრდის.',
    shortDescEn: 'Harvard\'s new study proves that less than 6 hours of sleep significantly increases type-2 diabetes risk.',
    contentKa: 'ჰარვარდის მედიცინის სკოლის მკვლევარებმა 10 წლის განმავლობაში 100,000 ადამიანი გამოიკვლიეს და დაადგინეს, რომ ძილის ნაკლებობა პირდაპირ კავშირშია ტიპი-2 დიაბეტის განვითარებასთან.\n\nნაკვლევმა გამოავლინა, რომ ადამიანები, რომლებიც 6 საათზე ნაკლებ ძილს იღებენ, 40%-ით უფრო მეტად ავადდებიან ტიპი-2 დიაბეტით მათ შედარებით, ვინც 7-8 საათს სძინავს.\n\nმეცნიერები გვირჩევენ ძილის ჰიგიენის გაუმჯობესებას, რეგულარული განრიგის დაცვას და ელექტრონული მოწყობილობების მოხმარების შეზღუდვას ძილამდე.',
    contentEn: 'Researchers at Harvard Medical School studied 100,000 people over 10 years and determined that sleep deprivation is directly linked to the development of type-2 diabetes.\n\nThe study revealed that people who get less than 6 hours of sleep are 40% more likely to develop type-2 diabetes compared to those sleeping 7-8 hours. The mechanism involves disruption of insulin sensitivity and glucose metabolism.\n\nScientists recommend improving sleep hygiene, maintaining regular schedules, and limiting electronic device use before bed. Simple lifestyle changes could prevent millions of diabetes cases globally.',
    category: 'Research', authorId: 'admin-001', authorName: 'Nika Alaverdashvili',
    createdAt: new Date(Date.now() - 518400000).toISOString(), likes: [], dislikes: []
  }
];

const SEED_COMMENTS: Comment[] = [
  { id: 'c-001', postId: 'post-001', userId: 'admin-001', userName: 'Nika Alaverdashvili', text: 'Fascinating discovery! This could change everything we know about life in the universe.', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'c-002', postId: 'post-002', userId: 'admin-001', userName: 'Nika Alaverdashvili', text: 'AI in medicine is advancing at an incredible pace. Exciting times ahead!', createdAt: new Date(Date.now() - 7200000).toISOString() }
];

@Injectable({ providedIn: 'root' })
export class PostService {
  private _posts = signal<Post[]>([]);
  private _comments = signal<Comment[]>([]);
  posts = this._posts.asReadonly();
  comments = this._comments.asReadonly();

  constructor() {
    this.loadOrSeed();
  }

  private loadOrSeed() {
    const stored = localStorage.getItem('sp_posts');
    if (stored) {
      try { this._posts.set(JSON.parse(stored)); } catch { this.seed(); }
    } else {
      this.seed();
    }
    const storedComments = localStorage.getItem('sp_comments');
    if (storedComments) {
      try { this._comments.set(JSON.parse(storedComments)); } catch { this.seedComments(); }
    } else {
      this.seedComments();
    }
  }

  private seed() {
    this._posts.set(SEED_POSTS);
    localStorage.setItem('sp_posts', JSON.stringify(SEED_POSTS));
  }

  private seedComments() {
    this._comments.set(SEED_COMMENTS);
    localStorage.setItem('sp_comments', JSON.stringify(SEED_COMMENTS));
  }

  private save() { localStorage.setItem('sp_posts', JSON.stringify(this._posts())); }
  private saveComments() { localStorage.setItem('sp_comments', JSON.stringify(this._comments())); }

  getPost(id: string): Post | undefined { return this._posts().find(p => p.id === id); }

  getPostsByCategory(cat: PostCategory): Post[] { return this._posts().filter(p => p.category === cat); }

  createPost(post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'dislikes'>): Post {
    const newPost: Post = { ...post, id: 'post-' + Date.now(), createdAt: new Date().toISOString(), likes: [], dislikes: [] };
    this._posts.set([newPost, ...this._posts()]);
    this.save();
    return newPost;
  }

  deletePost(id: string) {
    this._posts.set(this._posts().filter(p => p.id !== id));
    this.save();
  }

  toggleLike(postId: string, userId: string) {
    const posts = [...this._posts()];
    const idx = posts.findIndex(p => p.id === postId);
    if (idx < 0) return;
    const post = { ...posts[idx] };
    post.dislikes = post.dislikes.filter(id => id !== userId);
    if (post.likes.includes(userId)) { post.likes = post.likes.filter(id => id !== userId); }
    else { post.likes = [...post.likes, userId]; }
    posts[idx] = post;
    this._posts.set(posts);
    this.save();
  }

  toggleDislike(postId: string, userId: string) {
    const posts = [...this._posts()];
    const idx = posts.findIndex(p => p.id === postId);
    if (idx < 0) return;
    const post = { ...posts[idx] };
    post.likes = post.likes.filter(id => id !== userId);
    if (post.dislikes.includes(userId)) { post.dislikes = post.dislikes.filter(id => id !== userId); }
    else { post.dislikes = [...post.dislikes, userId]; }
    posts[idx] = post;
    this._posts.set(posts);
    this.save();
  }

  getComments(postId: string): Comment[] { return this._comments().filter(c => c.postId === postId); }

  getAllComments(): Comment[] { return this._comments(); }

  addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Comment {
    const newComment: Comment = { ...comment, id: 'c-' + Date.now(), createdAt: new Date().toISOString() };
    this._comments.set([...this._comments(), newComment]);
    this.saveComments();
    return newComment;
  }

  deleteComment(id: string) {
    this._comments.set(this._comments().filter(c => c.id !== id));
    this.saveComments();
  }

  getLatestPosts(n = 5): Post[] { return [...this._posts()].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, n); }
}
