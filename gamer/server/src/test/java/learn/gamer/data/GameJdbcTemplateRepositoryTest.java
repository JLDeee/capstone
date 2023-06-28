package learn.gamer.data;

import learn.gamer.models.Game;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GameJdbcTemplateRepositoryTest {

    @Autowired
    private GameJdbcTemplateRepository repository;

    @Autowired
    private KnownGoodState knownGoodState;

    static boolean hasSetup = false;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindGames() {
        List<Game> games = repository.findAll();
        assertNotNull(games);
        assertTrue(games.size() > 0);
    }

    @Test
    void shouldFindYakuzaZero() {
        Game expected = new Game(1, "Yakuza 0");
        Game actual = repository.findByGameTitle("Yakuza 0");

        assertEquals(expected.getGameTitle(), actual.getGameTitle());
    }

    @Test
    void shouldNotFindSimsZero() {
        Game badGame = repository.findByGameTitle("Sims 0");
        assertNull(badGame);
    }

    @Test
    void shouldAddGame() {
        Game game = new Game();
        game.setGameTitle("Destiny");
        Game result = repository.add(game);

        assertNotNull(result);
        // there are 5 games in the game table in the gamer_test database
        assertEquals(6, result.getGameId());
        assertEquals("Destiny", result.getGameTitle());
    }

    @Test
    void shouldDeleteById() {
        // add game since all games in database are in use
        Game game = new Game();
        game.setGameTitle("Destiny");
        Game addResult = repository.add(game);

        assertNotNull(addResult);
        // there are 5 games in the game table in the gamer_test database
        assertEquals(6, addResult.getGameId());
        assertEquals("Destiny", addResult.getGameTitle());

        boolean deleteResult = repository.deleteById(6);
        assertTrue(deleteResult);
        assertNull(repository.findByGameTitle("Destiny"));
    }

    @Test
    void shouldNotDeleteIfGameInUse() {
        boolean result = repository.deleteById(2);
        assertFalse(result);
    }

    @Test
    void shouldNotDeleteByNonExistingId() {
        boolean result = repository.deleteById(999);
        assertFalse(result);
    }
}