export default function AboutPage() {
    return (
        <section>
            <h1>About Me</h1>
            <p>Name: Matthew Elliott</p>
            <p>Student Number: 22453699</p>

            <h2>How to use this website</h2>
            {/* Embed video link here */}
            <video controls width="600">
                <source src="/howto.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>
    );
}