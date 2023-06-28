package learn.gamer.data;

import learn.gamer.models.Game;
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
    void shouldFindByGamerTag() {
        // (3, 3, 'MALE', 'gt_jackie', '1999-07-17', 'Hello, I love playing league of legends!'),
        Gamer jackie = repository.findByGamerTag("gt_jackie");
        assertNotNull(jackie);
        assertEquals(3, jackie.getGamerId());
        assertEquals(Gender.MALE, jackie.getGenderType());
        assertEquals(LocalDate.parse("1999-07-17"), jackie.getBirthDate());
        assertEquals("Hello, I love playing league of legends!", jackie.getBio());
    }

    @Test
    void shouldNotFindByNonExistingGamerTag() {
        Gamer badGamer = repository.findByGamerTag("blahblah");
        assertNull(badGamer);
    }

    @Test
    void shouldUpdate() {
        Gamer newJackie = repository.findByGamerTag("gt_jackie");
        newJackie.setBio("League of Legends XIV coming soon! (not a lie) (trust me)");

        assertTrue(repository.update(newJackie));
        Gamer actual = repository.findByGamerTag("gt_jackie");
        assertNotNull(actual);
        assertEquals("League of Legends XIV coming soon! (true)", actual.getBio());
    }
}