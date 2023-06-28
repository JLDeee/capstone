package learn.gamer.data;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import learn.gamer.models.AppUser;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)

class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    AppUserJdbcTemplateRepository repository;

    static boolean hasRun = false;

    @BeforeEach
    void setup() {
        if (!hasRun) {
            jdbcTemplate.update("call set_known_good_state();");
            hasRun = true;
        }
    }

    @Test
    void shouldFindAll(){

    }

    @Test
    void shouldFindJackieByGamerTag(){
        AppUser actual = repository.findByGamerTag("gt_jackie");

        assertTrue(actual.isEnabled());
        assertEquals(1, actual.getAuthorities().size());
        assertTrue(actual.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN")));
    }

}