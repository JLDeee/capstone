package learn.gamer.data;

import learn.gamer.models.Gamer;
import learn.gamer.models.Gender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GamerJdbcTemplateRepositoryTest {
    @Autowired
    private GamerJdbcTemplateRepository repository;

    @Autowired
    private KnownGoodState knownGoodState;

    static boolean hasSetup = false;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindGamers() {
        List<Gamer> gamers = repository.findAll();
        assertNotNull(gamers);
        assertTrue(gamers.size() > 0);
    }

    @Test
    void shouldFindByGamerId() {
        // (3, 3, 'MALE', 'gt_jackie', '1999-07-17', 'Hello, I love playing league of legends!'),
        Gamer jackie = repository.findByGamerId(3);
        assertNotNull(jackie);
        assertEquals("gt_jackie", jackie.getGamerTag());
        assertEquals(3, jackie.getGamerId());
        assertEquals(Gender.MALE, jackie.getGenderType());
        assertEquals(LocalDate.parse("1999-07-17"), jackie.getBirthDate());
        assertEquals("Hello, I love playing league of legends!", jackie.getBio());
    }

    @Test
    void shouldNotFindByNonExistingGamerId() {
        Gamer badGamer = repository.findByGamerId(999);
        assertNull(badGamer);
    }

    @Test
    void shouldFindByGameTitle() {
        List<Gamer> gamers = repository.findByGameTitle("Yakuza 0");
        assertNotNull(gamers);
        assertTrue(gamers.size() > 0);
        assertEquals(2, gamers.size());
    }

    @Test
    void shouldNotFindByNonExistingGameTitle() {
        List<Gamer> gamers = repository.findByGameTitle("BEEPBOOP");
        assertEquals(0, gamers.size());
    }

    @Test
    void shouldFindByGameId() {
        List<Gamer> gamers = repository.findByGameId(1);
        assertNotNull(gamers);
        assertTrue(gamers.size() > 0);
        assertEquals(2, gamers.size());
    }

    @Test
    void shouldNotFindByNonExistingGameId() {
        List<Gamer> gamers = repository.findByGameId(999);
        assertEquals(0, gamers.size());
    }

    @Test
    void shouldUpdate() {
        Gamer newJackie = repository.findByGamerId(3);
        newJackie.setBio("League of Legends XIV coming soon! (not a lie) (trust me)");

        assertTrue(repository.update(newJackie));
        Gamer actual = repository.findByGamerId(3);
        assertNotNull(actual);
        assertEquals("League of Legends XIV coming soon! (not a lie) (trust me)", actual.getBio());

        // changing it back so that the above tests passes
        actual.setBio("Hello, I love playing league of legends!");
        repository.update(actual);
    }
}