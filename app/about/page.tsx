/**
 * AboutPage component.
 * Displays author info and an embedded Vimeo video.
 */
export default function AboutPage() {
    return (
        <section>
            <h1>About Me</h1>
            <p>Name: Matthew Elliott</p>
            <p>Student Number: 22453699</p>

            <h2>How to use this website</h2>
            {/* Responsive Vimeo embed */}
            <div style={{ padding: '56.25% 0 0 0', position: 'relative', marginBottom: '1rem' }}>
                <iframe
                    src="https://player.vimeo.com/video/1114252362?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    title="How to use this website"
                ></iframe>
            </div>
        </section>
    );
}