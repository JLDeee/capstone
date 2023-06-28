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

//        @Autowired
//    private SolarPanelJdbcTemplateRepository repository;
//
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    static boolean hasSetup = false;
//
//    @BeforeEach
//    void setup() {
//        if (!hasSetup) {
//            hasSetup = true;
//            jdbcTemplate.update("call set_known_good_state();");
//        }
//    }
//
//    @Test
//    void shouldFindAll() throws DataAccessException {
//        List<SolarPanel> result = repository.findAll();
//        assertNotNull(result);
//        assertTrue(result.size() >= 4);
//
//        SolarPanel solarPanel = new SolarPanel();
//        solarPanel.setId(1);
//        solarPanel.setSection("The Ridge");
//        solarPanel.setRow(1);
//        solarPanel.setColumn(1);
//        solarPanel.setYearInstalled(2020);
//        solarPanel.setMaterial(Material.POLY_SI);
//        solarPanel.setTracking(true);
//
//        assertTrue(result.contains(solarPanel));
//    }
//
//    @Test
//    void shouldFindBySection() throws DataAccessException {
//        List<SolarPanel> result = repository.findBySection("The Ridge");
//        assertNotNull(result);
//        assertTrue(result.size() == 1 || result.size() == 2);
//    }
}